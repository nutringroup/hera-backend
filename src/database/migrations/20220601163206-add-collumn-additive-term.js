'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prospection_contract_influencer', 'is_additive_term', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      after: "use_image_date",
      defaultValue: false
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prospection_contract_influencer', 'is_additive_term');
  }
};
