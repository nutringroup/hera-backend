module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('prospection_financial_influencer', 'date_payment_receive', {
                type: Sequelize.DATEONLY,
                allowNull: true,
                after: 'value_payment'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_financial_influencer', 'date_payment_expected', {
                type: Sequelize.DATEONLY,
                allowNull: true,
                after: 'date_payment_receive'
              }, { transaction: t }),
              queryInterface.addColumn('prospection_financial_influencer', 'nf_file', {
                type: Sequelize.TEXT,
                allowNull: true,
                after: 'date_payment_expected'
              })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('prospection_financial_influencer', 'date_payment_receive', { transaction: t }),
              queryInterface.removeColumn('prospection_financial_influencer', 'date_payment_expected', { transaction: t }),
              queryInterface.removeColumn('prospection_financial_influencer', 'nf_file', { transaction: t }),
          ])
      })
  }
};