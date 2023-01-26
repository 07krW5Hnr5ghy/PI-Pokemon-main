import database from "../config/database";
import { DatabaseRepository, Id, Query, Name,Sorting,Column,Origin} from "../declaration";
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

    async list(sorting?:Sorting,column?:string,name?:Name,type?:string,origin?:Origin): Promise<Pokemon[]>{
        // get pokemon table and search by name
        let pokemons = repository.createQueryBuilder("pokemon")
        .where("pokemon.name LIKE :search",{search: `%${name}%`});

        // filter by type
        if(type){
            pokemons.andWhere(":type = ANY (string_to_array(classes,','))",{type:type})
        }

        // filter by origin
        if(origin){
            pokemons.andWhere("pokemon.origin = :origin",{origin:origin})
        }

        // sort mode and column to sort
        if(sorting && column){
            pokemons.orderBy(column,sorting)
        }

        // return the result of the request to pokemon table
        return pokemons.getMany();
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