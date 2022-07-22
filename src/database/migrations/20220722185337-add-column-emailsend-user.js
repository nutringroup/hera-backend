'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user', 'email_send', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "password"
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user', 'email_send');
  }
};
