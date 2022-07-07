'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('influencer', 'id_user', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'user', key: 'id' },
      onDelete: 'RESTRICT',
      after: 'id_segment_secondary',
      defaultValue: 27
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('influencer', 'id_user');
  }
};
 