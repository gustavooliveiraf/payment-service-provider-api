const database = require('../../../../../infra/database/sequelize/models');

const create = async (cardPayload, infraVersion, environment) => {
  const CardModel = database[infraVersion][environment].Card;

  const card = await CardModel.create({
    lastDigits: cardPayload.number.slice(-4),
    ...cardPayload,
  });

  return card.dataValues;
};

module.exports = create;
