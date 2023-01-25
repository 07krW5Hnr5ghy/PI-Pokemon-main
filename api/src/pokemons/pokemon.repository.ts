import database from "../config/database";
import { DatabaseRepository, Id, Query, Name,Sorting,Column} from "../declaration";
import { Pokemon } from "../entity/Pokemon";
import { getApiPokemons } from "../controllers/apiGetters";

const repository = database.getRepository(Pokemon);

export class PokemonRepository implements DatabaseRepository<Pokemon>{

    async download(): Promise<void>{
        await database.createQueryBuilder()
        .insert()
        .into(Pokemon)
        .values(await getApiPokemons(10)).execute();  
    }

    async create(data: Partial<Pokemon>, query?:Query): Promise<Pokemon>{
        const pokemon =  repository.create(data);
        await repository.save(pokemon);
        return pokemon;
    }

    async list(sorting:Sorting="ASC",column:string="name",name?:Name): Promise<Pokemon[]>{
        const pokemons = repository.createQueryBuilder("pokemon")
        .where("pokemon.name LIKE :s",{s: `%${name}%`})
        .orderBy(column,sorting).getMany();
        // if(!name){
        //     return pokemon.find();
        // }
        // if(name){
        //     pokemon.createQueryBuilder("pokemon")
        //     .where("pokemon.name LIKE :s",{s: `%${name}%`}).getMany();
        // }
        return pokemons;
    }

    async search(name:Name,query?:Query):Promise<Pokemon[]>{
        const search = await repository.createQueryBuilder("pokemon")
        .where("pokemon.name LIKE :s",{s: `%${name}%`}).getMany();
        return search;
    }

    async sort(sorting:Sorting,column:string):Promise<Pokemon[]>{
        const sorted = repository.createQueryBuilder("pokemon")
        .orderBy(column,sorting).getMany();
        return sorted;
    }

    async get(id:Id,query?:Query): Promise<Pokemon | null>{
        const pokemon = await repository.findOneBy({id:id as any});
        if(!pokemon){
            console.log("pokemon doesnt not exist");
        }
        return pokemon;
    }

    async update(id:Id,data:Pokemon,query?:Query):Promise<Pokemon | null>{
        await repository.update(id,data);
        return this.get(id,query);
    }

    async remove(id:Id,query?:Query): Promise<Pokemon | null>{
        const pokemon = await this.get(id,query);
        await repository.delete(id);
        return pokemon;
    }
}