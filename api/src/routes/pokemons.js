const {Router} = require("express");
const router = Router();
const {
    getPokemons,
    getTypes,
    getDetail,
    createPokemon,
    deletePokemon,
    updatePokemon,
    uploadImg,
} = require('../controllers/pokemons');

// load pokemons from api
router.get("/pokemons",getPokemons);
// get detail data from pokemon by id
router.get("/pokemons/:id",getDetail);
// load types of pokemons from api
router.get("/types",getTypes);
// add pokemon to database
router.post("/pokemons",createPokemon);
// delete created pokemon from the database
router.delete("/pokemons/:id",deletePokemon);
// update created pokemon from the database
router.put("/pokemons",updatePokemon);
// upload images
router.post("/upload",uploadImg);

module.exports = router;