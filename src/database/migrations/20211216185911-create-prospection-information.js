'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_information_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      public:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      audience:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cel:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_prospection:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_location:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'location_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_age:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'age_group_influencer', key: 'id' },
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
    await queryInterface.dropTable('prospection_information_influencer');
  }
};
