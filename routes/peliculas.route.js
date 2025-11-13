const { Router } = require('express');

const { peliculasGet,
        peliculasComoGet,
        peliculaIdGet,
        peliculasPost,
        peliculaPut,
        peliculaDelete,
        protagonistasPorPelicula,
        multimediaPorPelicula,
} = require('../controllers/peliculas.controller');


const router = Router();

//END Points
router.get('/', peliculasGet);

router.get('/como/:termino', peliculasComoGet);

router.get('/:id', peliculaIdGet);

router.post('/', peliculasPost);

router.put('/:id', peliculaPut);

router.delete('/:id', peliculaDelete);

router.get("/:id/protagonistas", protagonistasPorPelicula);

router.get("/:id/multimedias", multimediaPorPelicula);


module.exports = router;
