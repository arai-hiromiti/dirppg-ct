'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('nucleos', [
      {
        nome: 'DIRPPG-CT',
      },
      {
        nome: 'PROPPG',
      },
      {
        nome: 'CPGEI',
      },
      {
        nome: 'PPGA',
      },
      {
        nome: 'PPGCA' ,
      },
      {
        nome: 'PPGCTA',
      },
      {
        nome: 'PPGEB' ,
      },
      {
        nome: 'PPGEC' ,
      },
      {
        nome: 'PPGEF' ,
      },
      {
        nome: 'PPGEL',
      },
      {
        nome: 'PPGEM'  ,
      },
      {
        nome: 'PPGEFA' ,
      },
      {
        nome: 'FCET' ,
      },
      {
        nome: 'PGP' ,
      },
      {
        nome: 'PPGQ'  ,
      },
      {
        nome: 'PPGSAU' ,
      },
      {
        nome: 'PPGSE' ,
      },
      {
        nome: 'PPGTE' ,
      }, 
      {
        nome:'PROFMAT' ,
      },
      {
        nome:'PROFIAP' ,
      },
      {
        nome:'DIREC-CT' ,
      },
      {
        nome:'DIRGE-CT' ,
      },
      {
        nome:'DIRPLAD-CT'  ,
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
