'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitoring_user_actual_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_monitoring:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_user:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('monitoring_user_actual_influencer');
  }
};
