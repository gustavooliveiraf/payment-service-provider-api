
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cards', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    lastDigits: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    expirationDate: {
      type: Sequelize.DATE,
    },
    verificationCode: {
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
