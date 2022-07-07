'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      url:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      icon:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      menu:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      id_pai:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order:{
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('pages');
  }
};
