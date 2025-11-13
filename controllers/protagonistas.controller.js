const { response, request } = require("express");
const { Protagonista } = require("../models/protagonistas.model");
const { bdmysql,bdmysqlNube } = require('../database/mySqlConnection');
const { QueryTypes } = require("sequelize");

// CRUD

const protagonistasGet = async (req, res = response) => {

    try {

        const protagonistas = await Protagonista.findAll();

        res.json({ 
            ok: true, 
            data: protagonistas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: 'Hable con el Administrador', 
            err: error });
    }
};

// Obtener por ID
const protagonistaIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const protagonista = await Protagonista.findByPk(id);
    if (!protagonista) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Protagonista no encontrado" });
    }
    res.json({ 
        ok: true, 
        data: protagonista });
    } catch (error) {
    res.status(500).json({ 
        ok: false, 
        msg: 'Hable con el Administrador', 
        err: error });
    }
};

// Crear
const protagonistasPost = async (req, res = response) => {
    const { papel, fecha_participacion, heroes_id, peliculas_id } = req.body;

    const protagonista = new Protagonista({ 
        papel, 
        fecha_participacion, 
        heroes_id, 
        peliculas_id 
    });

    try {
        
        const existeProtagonista = await Protagonista.findOne({ 
            where: { 
                papel: papel,
                peliculas_id: peliculas_id
            } 
        });

        if (existeProtagonista) {
            return res.status(400).json({ 
                ok: false, 
                msg: `Ya existe un protagonista con el papel: ${papel} en esa película.`
            });
        }

        
        // Guardar en BD
        newProtagonista = await protagonista.save();

        res.json({
            ok: true,
            msg: 'Protagonista INSERTADO',
            data: protagonista
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


// Actualizar
const protagonistaPut = async (req, res = response) => {
    const { id } = req.params;
    const { papel, fecha_participacion, heroes_id, peliculas_id } = req.body;

    try {
    const protagonista = await Protagonista.findByPk(id);
    if (!protagonista) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Protagonista no encontrado" });
    }
    await protagonista.update({ papel, fecha_participacion, heroes_id, peliculas_id });
    res.json({ 
        ok: true, 
        msg: "Protagonista actualizado", 
        data: protagonista });
    } catch (error) {
    console.log(error);
    res.status(500).json({ 
        ok: false, 
        msg: 'Hable con el Administrador', 
        err: error });
    }
};

// Eliminar
const protagonistaDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
    const protagonista = await Protagonista.findByPk(id);
    if (!protagonista) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Protagonista no encontrado" });
    }

    await protagonista.destroy();

    res.json({ 
        ok: true, 
        msg: "Protagonista eliminado", 
        data: protagonista });
    } catch (error) {
    res.status(500).json({ 
        ok: false, 
        msg: "Error al eliminar protagonista", 
        err: error });
    }
};

module.exports = {
    protagonistasGet,
    protagonistaIdGet,
    protagonistasPost,
    protagonistaPut,
    protagonistaDelete,
};
