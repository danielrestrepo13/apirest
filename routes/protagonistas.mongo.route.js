const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const { existeProtagonistaPorId } = require('../helpers/db-validators.mongo');

const { obtenerProtagonistas,
        obtenerProtagonistasxPelicula,
        obtenerProtagonista,

        crearProtagonista,
        actualizarProtagonista,
        borrarProtagonista

} = require('../controllers/protagonistas.mongo.controller');


const router = Router();

//END Points
//SELECT/GET * from protagonistas
router.get('/', obtenerProtagonistas);

router.get('/pelicula', obtenerProtagonistasxPelicula);

router.get('/heroe', obtenerProtagonistasxPelicula);

router.get('/:id',
    check('id', 'No es un id de Mongo válido').isMongoId(), 
    check('id').custom( existeProtagonistaPorId ),
    validarCampos,    
    obtenerProtagonista);

router.post('/', crearProtagonista);

router.put('/:id', 
    check('id', 'No es un id de Mongo válido').isMongoId(), 
    check('id').custom( existeProtagonistaPorId ),
    validarCampos,
    actualizarProtagonista);

router.delete('/:id', 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProtagonistaPorId ),
    validarCampos,
    borrarProtagonista);


module.exports = router;
