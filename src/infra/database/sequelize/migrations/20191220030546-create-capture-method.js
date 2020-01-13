
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('captureMethods', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
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
    schema: 'transaction',
  }),
  down: (queryInterface) => queryInterface.dropTable('captureMethods'),
};
