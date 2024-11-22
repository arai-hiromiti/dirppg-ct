'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('editais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nucleo: {
        type: Sequelize.STRING
      },
      link1: {
        type: Sequelize.TEXT
      },
      link2: {
        type: Sequelize.TEXT
      },
      descricao: {
        type: Sequelize.TEXT
      },
      atividade: {
        type: Sequelize.STRING
      },
      periodo: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('editais');
  }
};