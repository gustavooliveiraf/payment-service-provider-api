const msIn3Hours = 180 * 60 * 1000;
const msIn1Minute = 60 * 1000;
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    value: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    authorizedValue: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    capturedValue: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    // paidValue: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER,
    // },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
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
    // captureMethod: {
    //   allowNull: false,
    //   type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
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
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: {
    //       schema: 'transaction',
    //       tableName: 'cards',
    //     },
    //     key: 'id',
    //   },
    // },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        const createdAt = this.getDataValue('createdAt');
        return createdAt.getTimezoneOffset() === 180
          ? new Date(createdAt - msIn3Hours)
          : new Date(createdAt - createdAt.getTimezoneOffset() * msIn1Minute);
      },
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        const updatedAt = this.getDataValue('updatedAt');
        return updatedAt.getTimezoneOffset() === 180
          ? new Date(updatedAt - msIn3Hours)
          : new Date(updatedAt - updatedAt.getTimezoneOffset() * msIn1Minute);
      },
    },
  }, {
    schema: 'transaction',
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User);
    Transaction.belongsTo(models.Card);
  };

  return Transaction;
};
