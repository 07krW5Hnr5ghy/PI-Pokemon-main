import database from "../config/database";
import { DatabaseRepository, Id, Query} from "../declaration";
import { Pokemon } from "../entity/Pokemon";
import { getApiPokemons } from "../controllers/apiGetters";

export class PokemonRepository implements DatabaseRepository<Pokemon>{

    async download(): Promise<void>{
        await database.createQueryBuilder()
        .insert()
        .into(Pokemon)
        .values(await getApiPokemons(10)).execute();  
    }

    async create(data: Partial<Pokemon>, query?:Query): Promise<Pokemon>{
        const repository =  database.getRepository(Pokemon);
        const pokemon =  repository.create(data);
        await repository.save(pokemon);
        return pokemon;
    }

    async list(query?:Query): Promise<Pokemon[]>{
        const repository = database.getRepository(Pokemon);
        return repository.find();
    }

    async get(id:Id,query?:Query): Promise<Pokemon | null>{
        const repository = database.getRepository(Pokemon);
        const pokemon = await repository.findOneBy({id:id as any});
        if(!pokemon){
            console.log("pokemon doesnt not exist");
        }
        return pokemon;
    }

    async update(id:Id,data:Pokemon,query?:Query):Promise<Pokemon | null>{
        const repository = database.getRepository(Pokemon);
        await repository.update(id,data);
        return this.get(id,query);
    }

    async remove(id:Id,query?:Query): Promise<Pokemon | null>{
        const repository = database.getRepository(Pokemon);
        const pokemon = await this.get(id,query);
        await repository.delete(id);
        return pokemon;
    }
}