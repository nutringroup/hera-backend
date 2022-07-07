'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('office_sector', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_office:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'office', key: 'id' },
        onDelete: 'CASCADE'
      },
      id_sector:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sector', key: 'id' },
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
    await queryInterface.dropTable('office_sector');
  }
};
