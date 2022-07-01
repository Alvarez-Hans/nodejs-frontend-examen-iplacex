'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listas_detalles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_lista: {
        type: Sequelize.INTEGER
      },
      producto: {
        type: Sequelize.STRING
      },
      id_tienda: {
        type: Sequelize.INTEGER
      },
      costo_presupuesto: {
        type: Sequelize.INTEGER
      },
      costo_real: {
        type: Sequelize.INTEGER
      },
      comprado: {
        type: Sequelize.BOOLEAN
      },
      notas: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('listas_detalles');
  }
};