'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_checklist_address_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cep:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      address:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      city:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      district:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      uf:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      number:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      complement:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_prospection:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
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
    await queryInterface.dropTable('prospection_checklist_address_influencer');
  }
};
