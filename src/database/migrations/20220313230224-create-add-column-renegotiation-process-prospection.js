'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('process_prospection_influencer', 'renegotiation', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      after: "id_status",
      defaultValue: 0
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('process_prospection_influencer', 'renegotiation');
  }
};
