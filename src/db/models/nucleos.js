'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nucleos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.usuarios, {
        through: 'usuarios_nucleos',
        as: 'usuarios',
        foreignKey: 'nucleo_id',
        otherKey: 'usuario_id',
      });
      this.belongsToMany(models.usuarios, {
        through: 'nucleos_editais',
        as: 'editais',
        foreignKey: 'nucleo_id',
        otherKey: 'edital_id',
      });

    }
  }
  nucleos.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nucleos',
  });

  return nucleos;
};