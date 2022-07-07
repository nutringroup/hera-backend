'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('location_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      initials:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      state:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      capital:{
        type: Sequelize.STRING,
        allowNull: false
      },
      region:{
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('location_influencer');
  }
};
