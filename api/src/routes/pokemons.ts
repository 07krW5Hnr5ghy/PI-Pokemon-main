import  {Router} from 'express';
const router : Router = Router();
import  {
    fetchPokemons,
    fetchTypes,
    fetchDetail,
    createPokemon,
    deletePokemon,
    updatePokemon,
} from '../controllers/pokemons';

// load pokemons from api
router.get("/pokemons",fetchPokemons);
// get detail data from pokemon by id
router.get("/pokemons/:id",fetchDetail);
// load types of pokemons from api
router.get("/types",fetchTypes);
// add pokemon to database
router.post("/pokemons",createPokemon);
// delete created pokemon from the database
router.delete("/pokemons/:id",deletePokemon);
// update created pokemon from the database
router.put("/pokemons",updatePokemon);

export default router;