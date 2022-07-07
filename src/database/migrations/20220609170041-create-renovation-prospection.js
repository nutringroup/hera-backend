'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_renovation_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      url:{
        type: Sequelize.STRING,
        allowNull: false
      },
      comment:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_status_renovation:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_renovation_prospection_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_prospection:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
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
     await queryInterface.dropTable('prospection_renovation_influencer');
    
  }
};
