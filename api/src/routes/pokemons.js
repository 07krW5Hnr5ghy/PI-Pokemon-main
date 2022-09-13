const {Router} = require("express");
const router = Router();
const {
    getPokemons,
    getTypes,
} = require('../controllers/pokemons');

router.get("/pokemons",getPokemons);
router.get("/types",getTypes);

module.exports = router;