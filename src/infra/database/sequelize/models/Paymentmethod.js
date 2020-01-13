
module.exports = (sequelize, DataTypes) => {
  const paymentMethod = sequelize.define('paymentMethod', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  paymentMethod.associate = () => {
    // associations can be defined here
  };
  return paymentMethod;
};
