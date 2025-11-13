const { Usuarios, } = require("../models/usuarios.model");

const existeEmail = async (correo = "") => {

  const existeEmail = await Usuarios.findOne({ where: { correo: correo} });

  if (existeEmail) {
    throw new Error(`El email ${correo} ya existe en la Base de Datos...`);
  }
};

const noExisteEmail = async (correo = "") => {

  const existeEmail = await Usuarios.findOne({ where: { correo: correo} });
  
  if (!existeEmail) {
    throw new Error(`El email ${correo} No existe en la Base de Datos...`);
  }
};

const {Heroe} = require("../models");

/**
 * Heroe
 */
const existeHeroePorId = async (id) => {
  // Verificar si el correo existe
  const existeHeroe = await Heroe.findById(id);
  if (!existeHeroe) {
    throw new Error(`El id no existe ${id}`);
  }
};


module.exports = {
  existeEmail,noExisteEmail,existeHeroePorId
};