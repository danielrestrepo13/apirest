const { Router } = require('express');

const { heroesGet,
        heroeIdGet,
        heroesComoGet,
        heroesPost,
        heroePut,
        heroeDelete
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/heroes.controller');


const router = Router();

//END Points
//SELECT/GET * from heroes
router.get('/', heroesGet);

router.get('/como/:termino', heroesComoGet);

router.get('/:id', heroeIdGet);

router.post('/', heroesPost);

router.put('/:id', heroePut);

router.delete('/:id', heroeDelete);

//router.patch('/', usuariosPatch);

module.exports = router;
