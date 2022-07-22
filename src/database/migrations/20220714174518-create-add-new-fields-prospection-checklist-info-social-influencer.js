module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('prospection_checklist_social_influencer', 'additional_image_use', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'comment_checklist',
                defaultValue: 0
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'additional_period', {
                type: Sequelize.INTEGER,
                allowNull: true,
                after: 'additional_image_use'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'additional_period_value', {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
                after: 'additional_period'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'paid_partnership', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'observation',
                defaultValue: 0
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'paid_partnership_value', {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
                after: 'paid_partnership'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'personal_storie_posted', {
                type: Sequelize.INTEGER,
                allowNull: false,
                after: 'storie_value'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'received_photo_date', {
                type: Sequelize.STRING,
                allowNull: false,
                after: 'photo_feed_value',
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'post_photo_feed_date', {
                type: Sequelize.STRING,
                allowNull: false,
                after: 'received_photo_date',
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'post_photo', {
                type: Sequelize.INTEGER,
                allowNull: true,
                after: 'post_photo_feed_date'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'video_duration', {
                type: Sequelize.INTEGER,
                allowNull: false,
                after: 'video_feed_value'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'video_format', {
                type: Sequelize.STRING,
                allowNull: false,
                after: 'video_duration'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'video_upload_date', {
                type: Sequelize.DATE,
                allowNull: false,
                after: 'video_format'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'received_video_date', {
                type: Sequelize.DATE,
                allowNull: false,
                after: 'video_upload_date'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'post_video', {
                type: Sequelize.INTEGER,
                allowNull: false,
                after: 'received_video_date'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'post_video_date', {
                type: Sequelize.DATE,
                allowNull: false,
                after: 'post_video'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'can_publish_in_publicity_day', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'post_video_date',
                defaultValue: 0
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'observation_other_publicity', {
                type: Sequelize.TEXT,
                allowNull: true,
                after: 'can_publish_in_publicity_day'
              }, { transaction: t }),
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'additional_image_use', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'additional_period', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'additional_period_value', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'paid_partnership', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'paid_partnership_value', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'personal_storie_posted', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'received_photo_date', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'post_photo_feed_date', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'post_photo', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'video_duration', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'video_format', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'video_upload_date', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'received_video_date', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'post_video', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'post_video_date', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'can_publish_in_publicity_day', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'observation_other_publicity', { transaction: t }),
          ])
      })
  }
};