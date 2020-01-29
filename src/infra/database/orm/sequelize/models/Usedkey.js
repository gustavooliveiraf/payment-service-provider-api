module.exports = (sequelize, DataTypes) => {
  const usedKey = sequelize.define('usedKey', {
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
    schema: 'register',
  });
  usedKey.associate = () => {
    // associations can be defined here
  };
  return usedKey;
};
