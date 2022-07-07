'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitoring_publication_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date_publication:{
        type: Sequelize.DATE,
        allowNull: false
      },
      link:{
        type: Sequelize.STRING,
        allowNull: true
      },
      comment:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      color:{
        type: Sequelize.STRING,
        allowNull: false
      },
      is_stories:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_photo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_video:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_evaluation:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      id_monitoring:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_status_publication:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status_publication_monitoring_influencer', key: 'id' },
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
    await queryInterface.dropTable('monitoring_publication_influencer');
  }
};
