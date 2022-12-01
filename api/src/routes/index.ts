import {Router} from 'express';
// Import all routes;
const router : Router = Router();
const pokemons = require('./pokemons');


// Config routes
router.use("/",pokemons);

export default router;
