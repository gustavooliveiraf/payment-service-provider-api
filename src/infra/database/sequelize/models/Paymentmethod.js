
module.exports = (sequelize, DataTypes) => {
  const paymentMethod = sequelize.define('paymentMethod', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
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
    schema: 'transaction',
  });

  paymentMethod.associate = () => {
    // associations can be defined here
  };

  return paymentMethod;
};
