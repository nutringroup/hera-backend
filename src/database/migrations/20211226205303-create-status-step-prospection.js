'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_status_step_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      obs:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comments:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      id_prospection:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_prospection_influencer', key: 'id' },
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('prospection_status_step_influencer');
  }
};
