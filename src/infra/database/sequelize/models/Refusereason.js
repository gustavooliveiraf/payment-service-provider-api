module.exports = (sequelize, DataTypes) => {
  const refuseReason = sequelize.define('refuseReason', {
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
    schema: 'payable',
  });

  refuseReason.associate = () => {
    // associations can be defined here
  };

  return refuseReason;
};
