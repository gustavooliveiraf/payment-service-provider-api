module.exports = (sequelize, DataTypes) => {
  const payableStatus = sequelize.define('payableStatus', {
    name: {
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

  payableStatus.associate = () => {
    // associations can be defined here
  };

  return payableStatus;
};
