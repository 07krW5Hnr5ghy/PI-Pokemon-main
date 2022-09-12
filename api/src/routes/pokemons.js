const {Router} = require("express");
const router = Router();
const {
    getPokemonsApi
} = require('../controllers/pokemons');

router.get("/pokemons",getPokemonsApi);

module.exports = router;