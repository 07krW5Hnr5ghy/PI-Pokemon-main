//const { Router } = require('express');
import {Router} from 'express';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router : Router = Router();
const pokemons = require('./pokemons');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/",pokemons);

export default router;
