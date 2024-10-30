'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios_nucleos', {
      id_usuarios: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      id_nucleo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Nucleos',
          key: 'id'
        },
        onDelete: 'CASCADE',
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

    await queryInterface.addConstraint('usuarios_nucleos', {
      fields: ['id_usuarios', 'id_nucleo'],
      type: 'primary key',
      name: 'usuarios_nucleos_pkey'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios_Nucleos');
  }
};