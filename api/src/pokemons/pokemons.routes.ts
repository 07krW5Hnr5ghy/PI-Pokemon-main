import {Router} from "express";

import { PokemonController } from "./pokemon.controller";
import { PokemonRepository } from "./pokemon.repository";

const router = Router();

const controller = new PokemonController(
    new PokemonRepository()
);
/* routes to manage pokemon table */
router.get("/p-data",controller.download.bind(controller));
router.post("/pokemons",controller.create.bind(controller));
router.get("/pokemons", controller.list.bind(controller));
router.get("/pokemons/:pokeId", controller.get.bind(controller));
router.put("/pokemons/:pokeId", controller.update.bind(controller));
router.delete("/pokemons/:pokeId", controller.remove.bind(controller));

export default router;