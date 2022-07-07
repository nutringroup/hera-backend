'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('additive_term_prospection_influencer', { 
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
      id_reason_additive_term:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'reason_additive_term_prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_status_additive_term:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_additive_term_prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      has_file:{
        type: Sequelize.BOOLEAN,
        allowNull: true
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
     await queryInterface.dropTable('additive_term_prospection_influencer');
  }
};

