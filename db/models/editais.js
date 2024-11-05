'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class editais extends Model {
    static associate(models) {
      this.belongsToMany(models.nucleos, {
        through: 'nucleos_editais',
        as: 'nucleos',
        foreignKey: 'edital_id',
        otherKey: 'nucleo_id',
      });
    }
  }
  editais.init({
    nucleo:DataTypes.STRING,
    link1: DataTypes.STRING,
    link2: DataTypes.STRING,
    descricao: DataTypes.STRING,
    atividade: DataTypes.STRING,
    periodo: DataTypes.STRING,
    titulo: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'editais',
  });
  return editais;
};