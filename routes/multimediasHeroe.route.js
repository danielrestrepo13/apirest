const { Router } = require('express');
const {
    multimediasHeroeGet,
    multimediaHeroeIdGet,
    multimediasHeroePost,
    multimediaHeroePut,
    multimediaHeroeDelete,
} = require('../controllers/multimediasHeroe.controller');

const router = Router();

// END Points
router.get("/", multimediasHeroeGet);
router.get("/:id", multimediaHeroeIdGet);
router.post("/", multimediasHeroePost);
router.put("/:heroes_id/:multimedias_idmultimedia", multimediaHeroePut);
router.delete("/:heroes_id/:multimedias_idmultimedia", multimediaHeroeDelete);

module.exports = router;
