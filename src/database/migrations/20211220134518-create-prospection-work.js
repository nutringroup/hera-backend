'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_work_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      contract_period:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      media_audience:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      media_value:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      image_use:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      job:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      comments:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      id_prospection:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_type:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'type_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_exclusivity:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'exclusivity_influencer', key: 'id' },
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
    await queryInterface.dropTable('prospection_work_influencer');
  }
};
