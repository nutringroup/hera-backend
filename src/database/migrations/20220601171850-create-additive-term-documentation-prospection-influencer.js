'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('additive_term_documentation_prospection_influencer', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_additive_term:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'additive_term_prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
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
     await queryInterface.dropTable('additive_term_documentation_prospection_influencer');
  }
};

