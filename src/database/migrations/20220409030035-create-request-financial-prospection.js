'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_financial_request_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      confirm_tl_prospection:{
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      confirm_tl_monitoring:{
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      id_prospection_financial:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_financial_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prospection_financial_request_influencer');
  }
};
