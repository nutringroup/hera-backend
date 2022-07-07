'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_distraction_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      url_monitoring:{
        type: Sequelize.STRING,
        allowNull: true
      },
      comment_monitoring:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      url_prospection:{
        type: Sequelize.STRING,
        allowNull: true
      },
      comment_prospection:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_status_distraction:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_distraction_prospection_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_prospection:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      comment_reproved:{
        type: Sequelize.TEXT,
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
     await queryInterface.dropTable('prospection_distraction_influencer');
    
  }
};
