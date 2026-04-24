const { Sequelize, DataTypes } = require('sequelize');

// Crear conexión a base de datos (archivo local)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Definir modelo
const Movimiento = sequelize.define('Movimiento', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING
    }
});

module.exports = { sequelize, Movimiento };