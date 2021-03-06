'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      token:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      token_time_validation:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
