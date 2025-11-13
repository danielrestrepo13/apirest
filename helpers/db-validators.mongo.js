const { Heroe } = require("../models");

const { Pelicula } = require("../models");

const { Protagonista } = require("../models");

/**
 * Heroe
 */
const existeHeroePorId = async (id) => {
  // Verificar si el heroe existe
    const existeHeroe = await Heroe.findById(id);
    if (!existeHeroe) {
    throw new Error(`El id no existe ${id}`);
    }
};

/**
 * Película
 */
const existePeliculaPorId = async (id) => {
  // Verificar si la película existe
    const existePelicula = await Pelicula.findById(id);
    if (!existePelicula) {
    throw new Error(`El id no existe ${id}`);
    }
};

/**
 * Protagonistas
 */
const existeProtagonistaPorId = async (id) => {
  // Verificar si el protagonista existe
    const existeProtagonista = await Protagonista.findById(id);
    if (!existeProtagonista) {
    throw new Error(`El id del protagonista no existe ${id}`);
    }
};

module.exports = {
    existeHeroePorId,
    existePeliculaPorId,
    existeProtagonistaPorId

};