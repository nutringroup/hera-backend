'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_distraction_file_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      url:{
        type: Sequelize.STRING,
        allowNull: true
      },
      id_distraction:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_distraction_influencer', key: 'id' },
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
     await queryInterface.dropTable('prospection_distraction_file_influencer');
    
  }
};
