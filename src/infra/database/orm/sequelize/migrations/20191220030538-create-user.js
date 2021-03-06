
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    email: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    apiKey: {
      unique: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
    },
    encryptionKey: {
      unique: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    schema: 'users',
  }),
  down: (queryInterface) => queryInterface.dropTable('users'),
};
