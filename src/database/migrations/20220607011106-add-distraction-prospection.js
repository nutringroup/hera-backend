'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('process_prospection_influencer', 'distraction', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      after: "renegotiation",
      defaultValue: 0
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('process_prospection_influencer', 'distraction');
  }
};
