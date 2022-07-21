'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      instagram_name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_track_followers:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'track_followers_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_segment:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'segment_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_segment_secondary:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'segment_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_user:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
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
    await queryInterface.dropTable('influencer');
  }
};
