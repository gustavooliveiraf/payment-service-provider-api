/* === dependency injection in the domain === */
const clients = require('../../../services/clients');
/* === dependency injection in the domain === */

const payableRepository = require('../../../infra/repositories/orm/sequelize/payable/create');
const transactionFindRepository = require('../../../infra/repositories/orm/sequelize/transaction/findByPk');
const transactionUpdateRepository = require('../../../infra/repositories/orm/sequelize/transaction/capture');
const transactionFullResponseModel = require('../../../domain/entities/transaction/full');
const statusEnum = require('../../../infra/database/enums/transaction/status');

const businessRules = require('../../../domain/businessRules/transaction/capture');

const update = (repository) => async (req, res, next) => {
  try {
    const { infraVersion, env } = req;
    const { id, value } = req.transaction;

    const transaction = await repository.transaction.findByPk(id, infraVersion, env);

    if (transaction.capture) throw new Error('Transação já capturada');
    if (transaction.status === statusEnum.refused) throw new Error('A transação não foi autorizada desde o começo');
    if (value > transaction.value) throw new Error('Valor maior que o autorizado');

    const businessRulesParameters = {
      authorizationCode: transaction.authorizationCode,
      brand: transaction.cards.brand,
      paymentMethod: transaction.paymentMethod,
      value: transaction.value,
    };

    const payable = await businessRules(businessRulesParameters, clients);

    if (!payable) {
      await repository.transaction.capture({ id, value, refuseReason: 'bandeira recusou' }, { infraVersion, env });
      return res.finish({ message: 'Transação não autorizada pela bandeira' });
    }

    await repository.transaction.capture({ id, value }, { infraVersion, env });

    const respPayable = await repository.payable.create({
      transactionId: id,
      value: payable.value,
      fee: payable.fee,
      paymentDate: payable.paymentDate,
      statusId: transaction.statusId,
    }, { infraVersion, env });

    transaction.payables = [respPayable];
    return res.finish(transactionFullResponseModel(transaction.cards, transaction));
  } catch (err) {
    if (err.message === 'ValidationError') return res.badRequest({ message: err.message, invalide_parameter: 'transactionId' });
    if (err.message === 'Transação já capturada' || err.message === 'A transação não foi autorizada desde o começo'
      || err.message === 'Valor maior que o autorizado') return res.badRequest({ message: err.message });

    return next(err);
  }
};

module.exports = (
  transaction = { ...transactionFindRepository, ...transactionUpdateRepository },
  payable = { create: payableRepository },
) => update({ transaction, payable });
