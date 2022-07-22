module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.changeColumn('prospection_checklist_social_influencer', 'video_upload_date', {
                type: Sequelize.STRING,
                allowNull: true,
              }, { transaction: t }),
              queryInterface.changeColumn('prospection_checklist_social_influencer', 'post_video_date', {
                type: Sequelize.STRING,
                allowNull: true,
              }, { transaction: t }),
              queryInterface.changeColumn('prospection_checklist_social_influencer', 'received_video_date', {
                type: Sequelize.STRING,
                allowNull: true,
              }, { transaction: t })   
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.changeColumn('prospection_checklist_social_influencer', 'video_upload_date', {
              type: Sequelize.DATE,
              allowNull: true,
            }, { transaction: t }),
            queryInterface.changeColumn('prospection_checklist_social_influencer', 'post_video_date', {
              type: Sequelize.DATE,
              allowNull: true,
            }, { transaction: t }),
            queryInterface.changeColumn('prospection_checklist_social_influencer', 'received_video_date', {
              type: Sequelize.DATE,
              allowNull: true,
            }, { transaction: t })  
          ])
      })
  }
};