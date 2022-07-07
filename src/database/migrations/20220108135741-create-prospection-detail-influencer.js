'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_checklist_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nickname:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      name_full:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      class:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      fallowers:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      advice:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      coupon:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthday:{
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('prospection_checklist_influencer');
  }
};
