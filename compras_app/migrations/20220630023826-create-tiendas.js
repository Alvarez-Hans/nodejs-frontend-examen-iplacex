'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tiendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombre_sucursal: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      cuidad: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      validado: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('tiendas');
  }
};