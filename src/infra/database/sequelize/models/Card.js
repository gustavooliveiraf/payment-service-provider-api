
module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define('card', {
    lastDigits: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    expirationDate: {
      type: DataTypes.DATE,
    },
    verificationCode: {
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

  card.associate = () => {
    // associations can be defined here
  };

  return card;
};
