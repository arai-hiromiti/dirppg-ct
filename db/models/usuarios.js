'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsToMany(models.nucleos, {
        through: 'usuarios_nucleos',
        as: 'nucleos',
        foreignKey: 'usuario_id',
        otherKey: 'nucleo_id',
      });
    }
  }
  usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    resetToken:DataTypes.STRING,
    resetTokenExpiration: DataTypes.DATE,
  }, {
    hooks: {
      beforeCreate: async (usuario) => {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('senha')) {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
      }
    },
    sequelize,
    modelName: 'usuarios',
  });

  usuarios.prototype.validarSenha = async function(senha) {
    return await bcrypt.compare(senha, this.senha);
  };

  return usuarios;
};

