module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('prospection_work_influencer', 'initial_date', {
                type: Sequelize.DATEONLY,
                allowNull: false,
                after: 'id'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_work_influencer', 'final_date', {
                type: Sequelize.DATEONLY,
                allowNull: false,
                after: 'initial_date'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_work_influencer', 'additional_image_use', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'comments'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_work_influencer', 'additional_period', {
                type: Sequelize.INTEGER,
                allowNull: true,
                after: 'additional_image_use'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_work_influencer', 'additional_period_value', {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
                after: 'additional_period'
              }, { transaction: t }),
              queryInterface.removeColumn('prospection_work_influencer', 'image_use', { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('prospection_work_influencer', 'initial_date', { transaction: t }),
              queryInterface.removeColumn('prospection_work_influencer', 'final_date', { transaction: t }),
              queryInterface.removeColumn('prospection_work_influencer', 'additional_image_use', { transaction: t }),
              queryInterface.removeColumn('prospection_work_influencer', 'additional_period', { transaction: t }),
              queryInterface.removeColumn('prospection_work_influencer', 'additional_period_value', { transaction: t }),
              queryInterface.addColumn('prospection_work_influencer', 'image_use', {
                type: Sequelize.STRING,
                allowNull: false,
                after: 'media_value'
              }, { transaction: t })
          ])
      })
  }
};