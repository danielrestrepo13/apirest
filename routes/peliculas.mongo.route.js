const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const { existePeliculaPorId } = require('../helpers/db-validators.mongo');

const { obtenerPeliculas,
        obtenerPelicula,

        crearPelicula,
        actualizarPelicula,
        borrarPelicula

    } = require('../controllers/peliculas.mongo.controller');


const router = Router();

//END Points
//SELECT/GET * from peliculas
router.get('/', obtenerPeliculas);

router.get('/:id',
    check('id', 'No es un id de Mongo válido').isMongoId(), 
    check('id').custom( existePeliculaPorId ),
    validarCampos,    
    obtenerPelicula);

router.post('/', crearPelicula);

router.put('/:id', 
    check('id', 'No es un id de Mongo válido').isMongoId(), 
    check('id').custom( existePeliculaPorId ),
    validarCampos,
    actualizarPelicula);

router.delete('/:id', 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existePeliculaPorId ),
    validarCampos,
    borrarPelicula);

module.exports = router;
