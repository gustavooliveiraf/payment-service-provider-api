module.exports = (sequelize, DataTypes) => {
  const payable = sequelize.define('payable', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
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
    statusId: {
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
    transactionId: {
      allowNull: false,
      type: DataTypes.UUID,
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
    payable.belongsTo(models.Transaction, {
      as: 'transaction',
    });
  };

  return payable;
};
