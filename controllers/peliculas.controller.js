const { response, request } = require('express')
const { Pelicula } = require('../models/peliculas.model');
const { bdmysql,bdmysqlNube } = require('../database/mySqlConnection');
const { QueryTypes } = require("sequelize");

const peliculasGet = async (req, res = response) => {

    try {
        const peliculas = await Pelicula.findAll();

        res.json({ 
            ok: true, 
            data: peliculas 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: 'Hable con el Administrador', 
            err: error 
        });
    }
};

//WHERE nombre LIKE '%" + termino + "%'" 
const peliculasComoGet = async(req = request, res = response) => {

    const { termino } = req.params;

    try {
        const [results, metadata] = await bdmysqlNube.query(
            "SELECT nombre" +
            " FROM peliculas_danielgarcia" +
            " WHERE nombre LIKE '%" + termino + "%'" +
            " ORDER BY nombre"
        );


        res.json({
            ok:true,
            data: results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error

        });
    }
};

//WHERE id = ?id
const peliculaIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {

        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ 
                ok: false, 
                msg: 'Película no encontrada' 
            });
        }

        res.json({ 
            ok: true, 
            data: pelicula 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: 'Hable con el Administrador', 
            err: error 
        });
    }
};

// Crear
const peliculasPost = async (req, res = response) => {

    //Desestructuracion de datos del BODY en variables del programa
    const { nombre } = req.body;

    const pelicula = new Pelicula({ nombre });

    try {

        const existePelicula = await Pelicula.findOne({ where: { nombre: nombre } });

        if (existePelicula) {
            return res.status(400).json({ 
            ok: false, 
            msg: 'Ya existe una película llamada: ' + nombre 
            });
        }

        // Guardar en BD
        newPelicula = await pelicula.save();

        pelicula.id = newPelicula;

        res.json({ok:true,
            msg:'Película INSERTADA',
            data:pelicula
        });

        } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

};

// Actualizar

const peliculaPut = async (req, res = response) => {

    const { id } = req.params;
    const { nombre } = req.body;

    console.log(id);
    console.log(nombre);

    try {

        const pelicula = await Pelicula.findByPk(id);

        if (!pelicula) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe una película con el id: ' + id
            });
        }

        console.log(nombre)
    
        await pelicula.update({ nombre });

        res.json({
            ok:true,
            msg:"Película ACTUALIZADA",
            data:pelicula
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

// Eliminar
const peliculaDelete = async (req, res = response) => {

    const { id } = req.params;

    console.log(id);

    try {

        const pelicula = await Pelicula.findByPk(id);

        if (!pelicula) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe una película con el id: ' + id
            });
        }

        //Borrado de la BD
        await pelicula.destroy();

        res.json({
            ok:true,
            msg:"Película ELIMINADA",
            data:pelicula,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        });

    }
};

// Consultas adicionales
// 1) Por película conocer cuáles son los protagonistas y el papel desempeñado
const protagonistasPorPelicula = async (req, res) => {
    try {
        const id = req.params.id;
        const filas = await bdmysqlNube.query(
        `SELECT p.id, p.papel, p.fecha_participacion, h.id AS heroe_id, h.nombre AS heroe_nombre
        FROM protagonistas_danielgarcia p
        JOIN heroes_danielgarcia h ON p.heroes_id = h.id
        WHERE p.peliculas_id = ?`,
    { replacements: [id], type: QueryTypes.SELECT }
    );
    res.json({ ok: true, data: filas });
    } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
    }
};

// 2) Por película conocer los elementos multimedia que tiene la película a través del héroe
const multimediaPorPelicula = async (req, res) => {
    try {
        const id = req.params.id;
        const filas = await bdmysqlNube.query(
        `SELECT DISTINCT m.idmultimedia, m.nombre, m.url, m.tipo
        FROM protagonistas_danielgarcia pr
        JOIN multimedias_heroe_danielgarcia mh ON pr.heroes_id = mh.heroes_id
        JOIN multimedias_danielgarcia m ON mh.multimedias_idmultimedia = m.idmultimedia
        WHERE pr.peliculas_id = ?`,
        { replacements: [id], type: QueryTypes.SELECT }
        );
        res.json({ ok: true, data: filas });
    } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
    }
};


module.exports = {
    peliculasGet,
    peliculasComoGet,
    peliculaIdGet,
    peliculasPost,
    peliculaPut,
    peliculaDelete,
    protagonistasPorPelicula,
    multimediaPorPelicula,
};

