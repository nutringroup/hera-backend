'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('type_notification', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_sector:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sector', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_module_notification:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'module_notification', key: 'id' },
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
     await queryInterface.dropTable('type_notification');
    
  }
};
