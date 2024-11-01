'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('nucleos', [
      {
        nome: 'DIRPPG-CT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PROPPG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'CPGEI',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGCA' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGCTA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGEB' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGEC' , 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGEF' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGEL',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGEM'  ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGEFA' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'FCET' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PGP' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGQ'  ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGSAU' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGSE' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'PPGTE' ,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome:'PROFMAT' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome:'PROFIAP' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome:'DIREC-CT' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome:'DIRGE-CT' ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome:'DIRPLAD-CT'  ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
