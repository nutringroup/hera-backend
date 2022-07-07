'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitoring_publication_photo_influencer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      photo:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date_receive:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      date_post:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      id_publication:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_publication_influencer', key: 'id' },
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
    await queryInterface.dropTable('monitoring_publication_photo_influencer');
  }
};
