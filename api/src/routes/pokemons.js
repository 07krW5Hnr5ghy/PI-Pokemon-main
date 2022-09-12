const {Router} = require("express");
const router = Router();
const {
    getPokemons
} = require('../controllers/pokemons');

router.get("/pokemons",getPokemons);

module.exports = router;