'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitoring_publication_stories_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sequence:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      link:{
        type: Sequelize.STRING,
        allowNull: true
      },
      id_publication:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_publication_influencer', key: 'id' },
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
    await queryInterface.dropTable('monitoring_publication_stories_influencer');
  }
};
