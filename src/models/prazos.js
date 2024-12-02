'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prazos extends Model {
    static associate(models) {
      this.belongsTo(models.editais, {
        foreignKey: 'id_edital',
        as: 'edital',
        onDelete: 'CASCADE', 
      });
    }
  }
  prazos.init({
    id_edital: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'editais',
        key: 'id'
      },
    },
    descricao: DataTypes.STRING,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'prazos',
  });
  return prazos;
};