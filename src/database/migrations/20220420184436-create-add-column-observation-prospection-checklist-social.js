'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prospection_checklist_social_influencer', 'observation', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "bowl_send"
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prospection_checklist_social_influencer', 'observation');
  }
};
