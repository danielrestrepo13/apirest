const Heroe = require('./mongoHeroes.model'); //Referencia para Mongo
const Pelicula = require('./mongoPeliculas.model'); //Referencia para Mongo
const Protagonista = require('./mongoProtagonistas.model'); //Referencia para Mongo

const { Heroes } = require('./mySqlHeroes.model'); //Referencia para mySql



module.exports = {
    Heroe,
    Pelicula,
    Protagonista,
    Heroes
}
