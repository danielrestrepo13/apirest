const { response, request } = require('express');
const { Multimedia } = require('../models/multimedias.model');

// CRUD

// Obtener todos (GET)
const multimediasGet = async (req, res = response) => {
    try {
        const multimedias = await Multimedia.findAll();
        res.json({ 
            ok: true, 
            data: multimedias });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al obtener multimedias", 
            err: error });
    }
};

// Obtener por ID
const multimediaIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const multimedia = await Multimedia.findByPk(id);
        if (!multimedia) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Multimedia no encontrada" });
    }
    res.json({ 
        ok: true, 
        data: multimedia });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            msg: "Error al obtener multimedia", 
            err: error });
    }
};

// Crear
const multimediasPost = async (req, res = response) => {
    const { nombre, url, tipo } = req.body;

    const multimedia = new Multimedia({ nombre, url, tipo });

    try {
        const existeMultimedia = await Multimedia.findOne({ where: { nombre } });

    if (existeMultimedia) {
        return res.status(400).json({
            ok: false,
            msg: "Ya existe un elemento multimedia con el nombre: " + nombre,
        });
    }

    const nuevaMultimedia = await multimedia.save();

    res.json({
        ok: true,
        msg: "Multimedia INSERTADA",
        data: nuevaMultimedia,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al insertar multimedia", 
            err: error });
    }
};

// Actualizar
const multimediaPut = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, url, tipo } = req.body;

    try {
        const multimedia = await Multimedia.findByPk(id);

    if (!multimedia) {
        return res.status(404).json({
        ok: false,
        msg: "No existe multimedia con el id: " + id,
        });
    }

    await multimedia.update({ nombre, url, tipo });

    res.json({
        ok: true,
        msg: "Multimedia ACTUALIZADA",
        data: multimedia,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al actualizar multimedia", 
            err: error });
    }
};

// Eliminar
const multimediaDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const multimedia = await Multimedia.findByPk(id);

    if (!multimedia) {
        return res.status(404).json({
        ok: false,
        msg: "No existe multimedia con el id: " + id,
        });
    }

    await multimedia.destroy();

    res.json({
        ok: true,
        msg: "Multimedia ELIMINADA",
        data: multimedia,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al eliminar multimedia", 
            err: error });
    }
};

module.exports = {
    multimediasGet,
    multimediaIdGet,
    multimediasPost,
    multimediaPut,
    multimediaDelete,
};
