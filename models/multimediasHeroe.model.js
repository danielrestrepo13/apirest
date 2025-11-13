const { DataTypes } = require('sequelize');
const { bdmysqlNube } = require('../database/mySqlConnection');

const MultimediaHeroe = bdmysqlNube.define('multimedias_heroe_danielgarcia',
    {
        heroes_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
    },
        multimedias_idmultimedia: {
            type: DataTypes.BIGINT,
            primaryKey: true,
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
    MultimediaHeroe,
};
