'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios_nucleos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios_nucleos.init({
    id_usuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    id_nucleo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'nucleos',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
   }, {
    sequelize,
    modelName: 'usuarios_nucleos',
    timestamps: false
  });

  usuarios_nucleos.associate = (models) => {
    usuarios_nucleos.belongsTo(models.usuarios, {
      foreignKey: 'id_usuarios',
      as: 'usuario',
      onDelete: 'CASCADE'
    });
    usuarios_nucleos.belongsTo(models.nucleos, {
      foreignKey: 'id_nucleo',
      as: 'nucleo',
      onDelete: 'CASCADE'
    });
  };

  return usuarios_nucleos;
};