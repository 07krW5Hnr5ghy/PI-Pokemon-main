const {Router} = require("express");
const router = Router();
const {
    getPokemons,
    getTypes,
    getDetail,
    createPokemon,
    deletePokemon,
    modifyPokemon,
} = require('../controllers/pokemons');

router.get("/pokemons",getPokemons);
router.get("/pokemons/:id",getDetail);
router.get("/types",getTypes);
router.post("/pokemons",createPokemon);
router.delete("/pokemons/:id",deletePokemon);
router.put("/pokemons/:id",modifyPokemon);

module.exports = router;