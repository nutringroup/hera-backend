'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_documentation_intervening_files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      url:{
        type: Sequelize.STRING,
        allowNull: false
      },
      subtitle:{
        type: Sequelize.STRING,
        allowNull: false
      },
      id_documentation_intervening:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_documentation_intervening', key: 'id' },
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
    await queryInterface.dropTable('prospection_documentation_intervening_files');
  }
};
