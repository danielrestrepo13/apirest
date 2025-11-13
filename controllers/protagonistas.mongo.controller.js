const { response } = require("express");
const { Protagonista } = require("../models");
const { now } = require("mongoose");


const obtenerProtagonistas = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, protagonistas] = await Promise.all([
            Protagonista.countDocuments(),
            Protagonista.find()
                .populate("heroes_id", "nombre bio img casa")
                .populate("peliculas_id", "nombre")
            
            // El método de abajo es para hacerlo sin populate:
            //Protagonista.find({})
                //.skip(Number(desde))
                //.sort({id: 1})
                //.limit(Number(limite)),
        ]);


        res.json({ 
            Ok: true, 
            total: total, 
            resp: protagonistas });
    } catch (error) {
        res.json({ 
            Ok: false, 
            msg: 'Error al obtener protagonistas',
            resp: error });
    }
};

const obtenerProtagonistasxPelicula = async (req, res = response) => {
    const { limite = 5, desde = 0, peliculas_id } = req.query;

    const query = { peliculas_id: peliculas_id };

    try {
    const [total, protagonistas] = await Promise.all([
        Protagonista.countDocuments(query),
        Protagonista.find(query)
        .populate("heroes_id", "nombre bio")
        .populate("peliculas_id", "nombre")

        //.skip(Number(desde))
        //.limit(Number(limite)),
    ]);


    res.json({ Ok: true, total: total, resp: protagonistas });
    } catch (error) {
    res.json({ Ok: false, resp: error });
    }
};


const obtenerProtagonista = async (req, res = response) => {

    //Mongo ID
    const { id } = req.params;

    try {
    const protagonista = await Protagonista.findById(id);

    res.json({ Ok: true, resp: protagonista });

    } catch (error) {
    res.json({ 
        Ok: false, 
        msg:'Error al obtener protagonista',
        resp: error });
    }
};

const crearProtagonista = async (req, res = response) => {

    const body = req.body;

    try {

        const protagonistaDB = await Protagonista.findOne({ papel: body.papel });

    if (protagonistaDB) {
        return res
      //.status(400)
        .json({
        Ok: false,
        msg: `El protagonista ${body.papel}, ya existe`,
        });
    }

    const protagonista = new Protagonista(body);

    // Guardar DB
    await protagonista.save();


    //console.log("CREADA",protagonista);
    res
    //.status(201)
    .json({ Ok: true, msg: 'Protagonista Insertado', resp: protagonista});
    } catch (error) {
    console.log("ERROR:INSERTAR",error);


    res.json({ 
        Ok: false, 
        msg:'Error al Insertar Protagonista', 
        resp: error 
    });
    }
};


const actualizarProtagonista = async (req, res = response) => {
    const { id } = req.params;

    const data  = req.body;

    console.log(data)

    try {

    const protagonista = await Protagonista.findByIdAndUpdate(id, data, {
        new: true,
    });


    res.json({ Ok: true, msg: 'Protagonista Actualizado', resp: protagonista });
    } catch (error) {
    console.log("ERROR_MODIFICAR",error);
    res.json({ Ok: false, resp: error });
    }
};


const borrarProtagonista = async (req, res = response) => {
    const { id } = req.params;
    try {

        const protagonistaBorrado = await Protagonista.findByIdAndDelete(id);

        res.json({ Ok: true, 
            msg: 'Protagonista Borrado',
            resp: protagonistaBorrado });

    } catch (error) {
    console.log("ERROR_BORRADO",error);
    res.json({ Ok: false, resp: error });
    }
};


module.exports = {
    obtenerProtagonistas,
    obtenerProtagonistasxPelicula,
    obtenerProtagonista,
    crearProtagonista,
    actualizarProtagonista,
    borrarProtagonista
};