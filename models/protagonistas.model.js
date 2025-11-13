const { DataTypes } = require("sequelize");
const { bdmysqlNube } = require("../database/mySqlConnection");

const Protagonista = bdmysqlNube.define('protagonistas_danielgarcia',
    
    {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    papel: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_participacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    heroes_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    peliculas_id: {
        type: DataTypes.BIGINT,
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
    Protagonista,
};
