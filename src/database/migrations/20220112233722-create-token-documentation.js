'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_token_documenttaion_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_prospection:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      token:{
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
    await queryInterface.dropTable('prospection_token_documenttaion_influencer');
  }
};
