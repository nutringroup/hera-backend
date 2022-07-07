'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('action_notification', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_user:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'user', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_type_notification:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'type_notification', key: 'id' },
        onDelete: 'RESTRICT'
      },
      id_detail_notification:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'detail_notification', key: 'id' },
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
     await queryInterface.dropTable('action_notification');
    
  }
};
