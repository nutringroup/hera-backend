module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('prospection_contract_influencer', 'annex_type', {
                type: Sequelize.STRING,
                allowNull: true,
                after: 'is_additive_term',
              }, { transaction: t }),
              queryInterface.addColumn('prospection_contract_influencer', 'annex_type_observation', {
                type: Sequelize.STRING,
                allowNull: true,
                after: 'annex_type'
              }, { transaction: t })   
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('prospection_contract_influencer', 'annex_type', { transaction: t }),
              queryInterface.removeColumn('prospection_contract_influencer', 'annex_type_observation', { transaction: t }),
          ])
      })
  }
};