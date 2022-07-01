'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listas_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  listas_detalle.init({
    id_lista: DataTypes.INTEGER,
    producto: DataTypes.STRING,
    id_tienda: DataTypes.INTEGER,
    costo_presupuesto: DataTypes.INTEGER,
    costo_real: DataTypes.INTEGER,
    comprado: DataTypes.BOOLEAN,
    notas: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'listas_detalle',
  });
  return listas_detalle;
};