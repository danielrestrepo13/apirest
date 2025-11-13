// routes/personaRoutes.js

//const express = require('express');
//const router = express.Router();
//const personaController = require('../controllers/personaController');

const {validarCampos} = require('../middlewares');
const { existePaisPorId} = require('../helpers/db-validatorsNeo4j');
const { check } = require('express-validator');

const { Router } = require('express');
const { createPersona,
    getAllPersonas,
    getPersonaById,
    updatePersona,
    deletePersona
    } = require('../controllers/personasNeo.controller');

const router = Router();

router.post('/',
    check('lugar_nacimiento').custom( existePaisPorId ),
    validarCampos,
    createPersona);

router.get('/', getAllPersonas);
router.get('/:id', getPersonaById);
router.put('/:id', updatePersona);
router.delete('/:id', deletePersona);

module.exports = router;

