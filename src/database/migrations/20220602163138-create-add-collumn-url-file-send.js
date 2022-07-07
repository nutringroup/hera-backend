module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('additive_term_prospection_influencer', 'has_file', { transaction: t }),
              queryInterface.addColumn('additive_term_prospection_influencer', 'url_file_send', {
                type: Sequelize.STRING,
                allowNull: true,
                after: 'description'
              }, { transaction: t }),
              
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('additive_term_prospection_influencer', 'url_file_send', { transaction: t }),
              queryInterface.addColumn('additive_term_prospection_influencer', 'has_file', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'description'
              }, { transaction: t })
          ])
      })
  }
};