
module.exports = (sequelize, DataTypes) => {
  const transactionStatus = sequelize.define('transactionStatus', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
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

  transactionStatus.associate = () => {
    // associations can be defined here
  };

  return transactionStatus;
};
