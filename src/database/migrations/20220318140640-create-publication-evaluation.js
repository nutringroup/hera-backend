'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitoring_publication_evaluation_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_publication:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_publication_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_status_evaluation:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_evaluation_monitoring_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      comment:{
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
    await queryInterface.dropTable('monitoring_publication_evaluation_influencer');
  }
};
