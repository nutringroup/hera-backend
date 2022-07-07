'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prospection_checklist_bank_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      percentage:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      main_name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf_cnpj:{
        type: Sequelize.STRING,
        allowNull: false
      },
      bank:{
        type: Sequelize.STRING,
        allowNull: false
      },
      agency:{
        type: Sequelize.STRING,
        allowNull: false
      },
      account:{
        type: Sequelize.STRING,
        allowNull: false
      },
      type_pix:{
        type: Sequelize.STRING,
        allowNull: true
      },
      pix:{
        type: Sequelize.STRING,
        allowNull: true
      },
      receipt_bank:{
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      url_bank:{
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('prospection_checklist_bank_influencer');
  }
};
