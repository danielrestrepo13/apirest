const { response } = require("express");
const { Pelicula } = require("../models");


//const { isValidObjectId } = require("../helpers/mongo-verify");

const { now } = require("mongoose");


const obtenerPeliculas = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    //const query = { estado: true };


    try {
        const [total, peliculas] = await Promise.all([
            Pelicula.countDocuments(),
            Pelicula.find({})
                .skip(Number(desde))
                .sort({id: 1})
                .limit(Number(limite)),
        ]);


        res.json({ 
            Ok: true, 
            total: total, 
            resp: peliculas });
    } catch (error) {
        res.json({ Ok: false, resp: error });
    }
};


const obtenerPelicula = async (req, res = response) => {

    //Mongo ID
    const { id } = req.params;

    try {
    const pelicula = await Pelicula.findById(id);

    res.json({ Ok: true, resp: pelicula });

    } catch (error) {
    res.json({ Ok: false, resp: error });
    }
};

const crearPelicula = async (req, res = response) => {

    const body = req.body;

    try {

        const peliculaDB = await Pelicula.findOne({ nombre: body.nombre });

    if (peliculaDB) {
        return res
      //.status(400)
        .json({
        Ok: false,
        msg: `La película ${body.nombre}, ya existe`,
        });
    }

    const pelicula = new Pelicula(body);

    // Guardar DB
    await pelicula.save();


    //console.log("CREADA",pelicula);
    res
    //.status(201)
    .json({ Ok: true, msg: 'Pelicula Insertada', resp: pelicula});
    } catch (error) {
    console.log("ERROR:INSERTAR",error);


    res.json({ Ok: false, msg:'Error al Insertar Película', resp: error });
    }
};


const actualizarPelicula = async (req, res = response) => {
    const { id } = req.params;

    const data  = req.body;

    console.log(data)

    try {

    const pelicula = await Pelicula.findByIdAndUpdate(id, data, {
        new: true,
    });


    res.json({ Ok: true, msg: 'Película Actualizada', resp: pelicula });
    } catch (error) {
    console.log("ERROR_MODIFICAR",error);
    res.json({ Ok: false, resp: error });
    }
};


const borrarPelicula = async (req, res = response) => {
    const { id } = req.params;
    try {

        const peliculaBorrada = await Pelicula.findByIdAndDelete(id);

        res.json({ Ok: true, 
            msg: 'Película Borrada',
            resp: peliculaBorrada });

    } catch (error) {
    console.log("ERROR_BORRADO",error);
    res.json({ Ok: false, resp: error });
    }
};


module.exports = {
    obtenerPeliculas,
    obtenerPelicula,
    crearPelicula,
    actualizarPelicula,
    borrarPelicula
};
