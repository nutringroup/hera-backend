module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('pages', 'access_director', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'order',
                defaultValue: 1
              }, { transaction: t }),
              queryInterface.addColumn('pages', 'access_teamleader', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'access_director',
                defaultValue: 1
              }, { transaction: t }),
              queryInterface.addColumn('pages', 'access_analyst', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                after: 'access_teamleader',
                defaultValue: 1
              }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('pages', 'access_director', { transaction: t }),
              queryInterface.removeColumn('pages', 'access_teamleader', { transaction: t }),
              queryInterface.removeColumn('pages', 'access_analyst', { transaction: t }),
          ])
      })
  }
};