import { Pokemon } from "../entity/Pokemon";
import database from "../config/database";

const repository = database.getRepository(Pokemon);

async function* idGenerator(){
    let lastId = await repository.createQueryBuilder("pokemon")
    .select("COUNT(*)")
    .where("pokemon.origin = :origin",{origin:"custom"}).getRawOne();
    console.log(lastId);
    let seed = Number(lastId.count) + 1;
    while(seed){
        if(seed > 0 && seed < 10){
            yield "0" + seed + "c";
        }
        if(seed > 10){
            yield seed + "c";
        }
        seed++;
    } 
}

export const keyGenerator = idGenerator();
// //const {Pokemon} = require('../db');
// import Pokemon from '../models/Pokemon';
// async function* idGenerator(){
//     let lastId = await Pokemon.count({
//         where:{origin:"custom+"}
//     });
//     let seed = lastId + 1;
//     while(seed){
//         if(seed > 0 && seed < 10){
//             yield "0" + seed + "c";
//         }

//         if(seed > 10){
//             yield seed + "c";
//         }

//         seed++;
//     }
// }

// export const keyGenerator = idGenerator();