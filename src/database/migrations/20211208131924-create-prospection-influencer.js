'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cod:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_influencer:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_squad:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'squad_influencer', key: 'id' },
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
    await queryInterface.dropTable('prospection_influencer');
  }
};
