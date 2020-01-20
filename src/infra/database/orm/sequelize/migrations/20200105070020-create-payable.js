
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('payables', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
    },
    value: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    fee: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    paymentDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    statusId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          schema: 'payable',
          tableName: 'payableStatuses',
        },
        key: 'id',
      },
    },
    transactionId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: {
          schema: 'transaction',
          tableName: 'transactions',
        },
        key: 'id',
      },
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
    schema: 'payable',
  }),
  down: (queryInterface) => queryInterface.dropTable('payables'),
};
