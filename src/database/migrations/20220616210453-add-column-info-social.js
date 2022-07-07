module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('prospection_checklist_social_influencer', 'value_use_image', {
                type: Sequelize.DECIMAL(10,2),
                allowNull: false,
                after: 'comment_boost',
                defaultValue: 0
              }, { transaction: t }),
              queryInterface.addColumn('prospection_checklist_social_influencer', 'comment_checklist', {
                type: Sequelize.TEXT,
                allowNull: false,
                after: 'value_use_image'
              }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'value_use_image', { transaction: t }),
              queryInterface.removeColumn('prospection_checklist_social_influencer', 'comment_checklist', { transaction: t })
          ])
      })
  }
};