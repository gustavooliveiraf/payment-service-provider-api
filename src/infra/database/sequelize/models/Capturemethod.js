
module.exports = (sequelize, DataTypes) => {
  const captureMethod = sequelize.define('captureMethod', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  captureMethod.associate = () => {
    // associations can be defined here
  };
  return captureMethod;
};
