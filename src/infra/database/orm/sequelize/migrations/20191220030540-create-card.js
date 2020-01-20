
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cards', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    lastDigits: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    holderName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    expirationDate: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cvv: {
      type: Sequelize.STRING,
    },
    brand: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    schema: 'register',
  }),
  down: (queryInterface) => queryInterface.dropTable('cards'),
};
