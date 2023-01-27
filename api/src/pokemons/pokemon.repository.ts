import database from "../config/database";
import { DatabaseRepository, Id, Query, Name,Sorting,Column,Origin, Data} from "../declaration";
import { Pokemon } from "../entity/Pokemon";
import { getApiPokemons } from "../apicalls/apiGetters";

const repository = database.getRepository(Pokemon);

export class PokemonRepository implements DatabaseRepository<Pokemon>{

    async download(): Promise<void>{
        await database.createQueryBuilder()
        .insert()
        .into(Pokemon)
        .values(await getApiPokemons(50)).execute();  
    }

    async create(data: Partial<Pokemon>, query?:Query): Promise<Pokemon>{
        const pokemon =  repository.create(data);
        await repository.save(pokemon);
        return pokemon;
    }

    async list(sorting?:Sorting,column?:string,name?:Name,type?:string,origin?:Origin,page?:number): Promise<Data>{
        const currentPage = Number(page) || 1;
        const perPage = 12;
        // get pokemon table and search by name
        let pokemons = repository.createQueryBuilder("pokemon")
        .where("pokemon.name LIKE :search",{search: `%${name}%`});

        // filter by type
        if(type){
            pokemons.andWhere(":type = ANY (classes)",{type:type})
        }

        // filter by origin
        if(origin){
            pokemons.andWhere("pokemon.origin = :origin",{origin:origin})
        }

        // sort mode and column to sort
        if(sorting && column){
            pokemons.orderBy(column,sorting)
        }

        const total = await pokemons.getCount();

        const records = await pokemons.offset((currentPage-1)*perPage).limit(perPage).getMany();

        const data : Data = {
            data: records,
            total,
            currentPage,
            last_page:Math.ceil(total/perPage),
        };

        return data;
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