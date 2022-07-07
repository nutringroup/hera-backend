module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('prospection_financial_influencer', 'distraction', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'confirm_payment',
                defaultValue: 0
              }, { transaction: t }),
              queryInterface.addColumn('prospection_financial_influencer', 'value_payment', {
                type: Sequelize.DECIMAL(10,2),
                allowNull: false,
                after: 'distraction'
              }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('prospection_financial_influencer', 'access_director', { transaction: t }),
              queryInterface.removeColumn('prospection_financial_influencer', 'value_payment', { transaction: t })
          ])
      })
  }
};