
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    value: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    authorizedValue: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    capturedValue: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    // paidValue: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    // },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    // paymentMethod: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: {
    //       schema: 'transaction',
    //       tableName: 'paymentMethods',
    //     },
    //     key: 'id',
    //   },
    // },
    // usedKey: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: {
    //       schema: 'users',
    //       tableName: 'usedKeys',
    //     },
    //     key: 'id',
    //   },
    // },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          schema: 'users',
          tableName: 'users',
        },
        key: 'id',
      },
    },
    // cardId: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: {
    //       schema: 'register',
    //       tableName: 'cards',
    //     },
    //     key: 'id',
    //   },
    // },
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
  down: (queryInterface) => queryInterface.dropTable('transactions'),
};
