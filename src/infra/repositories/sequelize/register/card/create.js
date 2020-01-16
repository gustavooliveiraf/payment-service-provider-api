const database = require('../../../../../infra/database/sequelize/models');

const create = async (cardPayload, infraVersion, env, transaction = false) => {
  const CardModel = database[infraVersion][env].Card;

  const model = await CardModel.create({
    lastDigits: cardPayload.number.slice(-4),
    ...cardPayload,
  });

  if (transaction) return model;

  return (await model).dataValues;
};

module.exports = create;
