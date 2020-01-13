module.exports = (sequelize, DataTypes) => {
  const payable = sequelize.define('payable', {
    value: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    fee: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    paymentDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          schema: 'payable',
          tableName: 'payableStatuses',
        },
        key: 'id',
      },
    },
    refuseReason: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          schema: 'payable',
          tableName: 'refuseReasons',
        },
        key: 'id',
      },
    },
    transactionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    schema: 'payable',
  });

  payable.associate = (models) => {
    payable.belongsTo(models.Transaction);
  };

  return payable;
};
