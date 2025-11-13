const { DataTypes } = require('sequelize');
const { bdmysql,bdmysqlNube } = require('../database/mySqlConnection');

const Multimedia = bdmysqlNube.define('multimedias_danielgarcia',
    {
        idmultimedia: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
    },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
    },
        url: {
            type: DataTypes.TEXT,
            allowNull: true,
    },
        tipo: {
            type: DataTypes.STRING(30),
            allowNull: false,
    },
    },  
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = {
    Multimedia,
};
