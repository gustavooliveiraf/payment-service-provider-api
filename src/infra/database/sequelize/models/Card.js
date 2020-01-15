
module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define('card', {
    lastDigits: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    holderName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    expirationDate: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cvv: {
      type: DataTypes.STRING,
    },
    brand: {
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

  card.associate = () => {
    // associations can be defined here
  };

  return card;
};
