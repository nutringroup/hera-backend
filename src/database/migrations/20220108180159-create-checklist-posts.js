'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_checklist_social_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      bowl_send:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      storie:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      storie_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      photo:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      photo_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      photo_feed:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      photo_feed_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      video:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      video_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      video_feed:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      video_feed_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      tiktok:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tiktok_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      tiktok_feed:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tiktok_feed_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      igtv:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      igtv_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      igtv_feed:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      igtv_feed_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      live:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      live_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      live_save:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      live_save_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      youtube:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      youtube_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      youtube_feed:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      youtube_feed_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      brand_exclusive:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      segment_exclusive:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      segment_exclusive_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      allow_boost:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment_boost:{
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('prospection_checklist_social_influencer');
  }
};
