const msIn3Hours = 180 * 60 * 1000;
const msIn1Minute = 60 * 1000;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    apiKey: {
      unique: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    encryptionKey: {
      unique: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        const createdAt = this.getDataValue('createdAt');
        return createdAt.getTimezoneOffset() === 180
          ? new Date(createdAt - msIn3Hours)
          : new Date(createdAt - createdAt.getTimezoneOffset() * msIn1Minute);
      },
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        const updatedAt = this.getDataValue('updatedAt');
        return updatedAt.getTimezoneOffset() === 180
          ? new Date(updatedAt - msIn3Hours)
          : new Date(updatedAt - updatedAt.getTimezoneOffset() * msIn1Minute);
      },
    },
  }, {
    schema: 'users',
  });

  User.associate = () => {
    // associations can be defined here
  };

  return User;
};
