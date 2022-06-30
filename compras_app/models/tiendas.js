'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tiendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tiendas.init({
    nombre: DataTypes.STRING,
    nombre_sucursal: DataTypes.STRING,
    direccion: DataTypes.STRING,
    cuidad: DataTypes.STRING,
    region: DataTypes.STRING,
    validado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tiendas',
  });
  return tiendas;
};