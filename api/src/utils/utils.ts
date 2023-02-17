import { Pokemon } from "../entity/Pokemon";
import database from "../config/database";

const repository = database.getRepository(Pokemon);
/* generate unique id for user generated records in pokemon table */
async function* idGenerator(){
    /* keep the count of last user created pokemon id*/
    let lastId = await repository.createQueryBuilder("pokemon")
    .select("COUNT(*)")
    .where("pokemon.origin = :origin",{origin:"custom"}).getRawOne();

    /* store the new id number */
    let seed = Number(lastId.count) + 1;
    /* append the letter c to the id to signal if the pokemon was user created */
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