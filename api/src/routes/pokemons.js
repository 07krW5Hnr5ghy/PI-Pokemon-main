const {Router} = require("express");
const router = Router();
const {
    getPokemons,
    getTypes,
    getDetail,
    createPokemon,
    deletePokemon,
    updatePokemon,
} = require('../controllers/pokemons');

router.get("/pokemons",getPokemons);
router.get("/pokemons/:id",getDetail);
router.get("/types",getTypes);
router.post("/pokemons",createPokemon);
router.delete("/pokemons/:id",deletePokemon);
router.put("/pokemons",updatePokemon);

module.exports = router;