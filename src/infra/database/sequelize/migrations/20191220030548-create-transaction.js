
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
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
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    authorizedValue: {
      type: Sequelize.INTEGER,
    },
    capturedValue: {
      type: Sequelize.INTEGER,
    },
    capture: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    statusId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          schema: 'transaction',
          tableName: 'transactionStatuses',
        },
        key: 'id',
      },
    },
    refuseReason: {
      type: Sequelize.STRING,
    },
    paymentMethodId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          schema: 'transaction',
          tableName: 'paymentMethods',
        },
        key: 'id',
      },
    },
    cardId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          schema: 'register',
          tableName: 'cards',
        },
        key: 'id',
      },
    },
    captureMethodId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          schema: 'transaction',
          tableName: 'captureMethods',
        },
        key: 'id',
      },
    },
    usedKeyId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          schema: 'register',
          tableName: 'usedKeys',
        },
        key: 'id',
      },
    },
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
