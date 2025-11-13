const { response } = require('express');
const { MultimediaHeroe } = require('../models/multimediasHeroe.model');

// Obtener todos
const multimediasHeroeGet = async (req, res = response) => {
    try {
        const registros = await MultimediaHeroe.findAll();
        res.json({ 
            ok: true, 
            data: registros });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al obtener registros", 
            err: error });
    }
};

// Obtener por ID
const multimediaHeroeIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const registro = await MultimediaHeroe.findByPk(id);
    if (!registro) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Registro no encontrado" });
    }
    res.json({ ok: true, data: registro });
    } catch (error) {
    res.status(500).json({ 
        ok: false, 
        msg: "Error al buscar registro", 
        err: error });
    }
};

// Crear
const multimediasHeroePost = async (req, res = response) => {
    const { heroes_id, multimedias_idmultimedia } = req.body;
    try {
        const registro = new MultimediaHeroe({ heroes_id, multimedias_idmultimedia });
        const newRegistro = await registro.save();

    res.json({
        ok: true,
        msg: "Registro INSERTADO",
        data: newRegistro,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false, 
            msg: "Error al insertar registro", 
            err: error });  
    }
};

// Actualizar
const multimediaHeroePut = async (req, res = response) => {
    const { heroes_id, multimedias_idmultimedia } = req.params;
    const { heroes_id: newHeroeId, multimedias_idmultimedia: newMultimediaId } = req.body;

    try {
        const registro = await MultimediaHeroe.findOne({
            where: { heroes_id, multimedias_idmultimedia }
    });
    if (!registro) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Registro no encontrado" });
    }

    await registro.update({
        heroes_id: newHeroeId || heroes_id,
        multimedias_idmultimedia: newMultimediaId || multimedias_idmultimedia
    });

    res.json({ 
        ok: true, 
        msg: "Registro actualizado", 
        data: registro });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            msg: "Error al actualizar registro", 
            err: error });
    }
};

// Eliminar
const multimediaHeroeDelete = async (req, res = response) => {
    const { heroes_id, multimedias_idmultimedia } = req.params;
    
    try {
        const registro = await MultimediaHeroe.findOne({
            where: { heroes_id, multimedias_idmultimedia }
        });
        
    if (!registro) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Registro no encontrado" });
    }

    await registro.destroy();

    res.json({ 
        ok: true, 
        msg: "Registro eliminado", 
        data: registro });
    } catch (error) {
    res.status(500).json({ 
        ok: false, 
        msg: "Error al eliminar registro", 
        err: error });
    }
};

module.exports = {
    multimediasHeroeGet,
    multimediaHeroeIdGet,
    multimediasHeroePost,
    multimediaHeroePut,
    multimediaHeroeDelete,
};
