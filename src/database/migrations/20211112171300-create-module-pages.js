'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('module_pages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_module:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'module', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_pages:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pages', key: 'id' },
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
    await queryInterface.dropTable('module_pages');
  }
};
