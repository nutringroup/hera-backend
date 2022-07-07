'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_documentation_contractor', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      rg:{
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf:{
        type: Sequelize.STRING,
        allowNull: false
      },
      nacionality:{
        type: Sequelize.STRING,
        allowNull: false
      },
      civil_state:{
        type: Sequelize.STRING,
        allowNull: true
      },
      job:{
        type: Sequelize.STRING,
        allowNull: true
      },
      tel:{
        type: Sequelize.STRING,
        allowNull: true
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      is_underage:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      id_documentation:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'prospection_documentation', key: 'id' },
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
    await queryInterface.dropTable('prospection_documentation_contractor');
  }
};
