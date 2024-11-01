'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nucleos_editais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nucleos_editais.init({

    nucleo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'nucleos',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    edital_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'editais',
        key: 'id'
      },
      onDelete: 'CASCADE'

    }
  }, {
    sequelize,
    modelName: 'nucleos_editais',
  });
  return nucleos_editais;
};