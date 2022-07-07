'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitoring_notification', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_action_notification:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'action_notification', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_monitoring:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
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
     await queryInterface.dropTable('monitoring_notification');
    
  }
};
