const { DataTypes } = require('sequelize');
const { bdmysql,bdmysqlNube } = require('../database/mySqlConnection');


const Pelicula = bdmysqlNube.define('peliculas_danielgarcia',
    {
        // Model attributes are defined here
        'id': {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },


        'nombre': {
            type: DataTypes.STRING,
            allowNull: false
            
        },

        
    },


    {
        //Maintain table name don't plurilize
        freezeTableName: true,


        // I don't want createdAt
        createdAt: false,


        // I don't want updatedAt
        updatedAt: false
    }
);



module.exports = {
    Pelicula,
}
