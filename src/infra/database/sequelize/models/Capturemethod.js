
module.exports = (sequelize, DataTypes) => {
  const captureMethod = sequelize.define('captureMethod', {
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

  captureMethod.associate = () => {
    // associations can be defined here
  };

  return captureMethod;
};
