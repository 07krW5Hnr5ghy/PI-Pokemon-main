const {Router} = require("express");
const router = Router();
const {
    getPokemons,
    getTypes,
    getDetail,
    createPokemon,
} = require('../controllers/pokemons');

router.get("/pokemons",getPokemons);
router.get("/pokemons/:id",getDetail);
router.get("/types",getTypes);
router.post("/pokemons",createPokemon);

module.exports = router;