import database from "../config/database";
import { DatabaseRepository, Id, Query, Name,Sorting,Origin, Data} from "../declaration";
import { Pokemon } from "../entity/Pokemon";
import { getApiPokemons } from "../apicalls/apiGetters";
// connect with Pokemon table in database
const repository = database.getRepository(Pokemon);

/* class with methods to manage data of table Pokemon in database */
export class PokemonRepository implements DatabaseRepository<Pokemon>{

    // insert Pokemons data from remote api in Pokemon table
    async download(): Promise<void>{
        await database.createQueryBuilder()
        .insert()
        .into(Pokemon)
        .values(await getApiPokemons(250)).execute();  
    }

    // create new records in table Pokemon from user input data
    async create(data: Partial<Pokemon>): Promise<Pokemon>{
        const pokemon =  repository.create(data);
        await repository.save(pokemon);
        return pokemon;
    }
    
    /* send data to frontend filtering, sorting and pagination with parameters
    received from the frontend */
    async list(sorting?:Sorting,column?:string,name?:Name,type?:string,origin?:Origin,page?:number): Promise<Data>{
        const currentPage = Number(page) || 1;
        // set the records that must be retrieved in each page
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

        // activate record field set in true
        pokemons.andWhere("pokemon.active = :status",{status:true});

        // sort mode and column to sort
        if(sorting && column){
            pokemons.orderBy(column,sorting)
        }

        // store the count of records in table Pokemon for calculate pagination
        const total = await pokemons.getCount();

        // apply pagination in data for frontend
        const records = await pokemons.offset((currentPage-1)*perPage).limit(perPage).getMany();

        /* return object with data records from Pokemon table,
        count of records, page number and last page for the records
        of the Pokemon table */
        const data : Data = {
            records,
            total,
            currentPage,
            last_page:Math.ceil(total/perPage),
        };

        return data;
    }

    /* search by name in the records of Pokemon table */
    async search(name:Name):Promise<Pokemon[]>{
        const search = await repository.createQueryBuilder("pokemon")
        .where("pokemon.name LIKE :s",{s: `%${name}%`}).getMany();
        return search;
    }

    /* sorting records in ascending and descending order using 
    a table field */
    async sort(sorting:Sorting,column:string):Promise<Pokemon[]>{
        const sorted = repository.createQueryBuilder("pokemon")
        .orderBy(column,sorting).getMany();
        return sorted;
    }

    /* retrieve a record using the id parameter */
    async get(id:Id,query?:Query): Promise<Pokemon | null>{
        const pokemon = await repository.findOneBy({id:id as string});
        if(!pokemon){
            console.log("pokemon doesnt not exist");
        }
        return pokemon;
    }

    /* update a record using the id parameter */
    async update(id:Id,data:Partial<Pokemon>,query?:Query):Promise<Pokemon | null>{
        await repository.update(id,data);
        return this.get(id,query);
    }

    /* delete a record using the id parameter */
    async remove(id:Id,query?:Query): Promise<Pokemon | null>{
        const pokemon = await this.get(id,query);
        await repository.delete(id);
        return pokemon;
    }
}