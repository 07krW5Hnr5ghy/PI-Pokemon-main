import {Request,Response,NextFunction} from "express";
import { DatabaseRepository } from "../declaration";
import { keyGenerator } from "../utils/utils";
import {Pokemon} from "../entity/Pokemon";
import {RequestParams,RequestBody,ResponseBody,RequestQuery } from "../declaration";
import database from "../config/database";
// connect with Pokemon table in database
const repository = database.getRepository(Pokemon);
/* class with methods by routes in backend */
export class PokemonController{
    constructor(private repository:DatabaseRepository<Pokemon>){}
    /* route method to retrieve data from remote api */
    async download(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            /* count the records in Table pokemon */
            console.log(database);
            let records = await repository.createQueryBuilder("pokemon")
            .select("COUNT(*)")
            .getRawOne();
            /* check if the Pokemon table contains records
            if the table has not records download data
            from remote api */
            if(Number(records.count) === 0){
                await this.repository.download(); 
                res.status(200).json({message:"api records downloaded"});
            }else{
                res.status(200).json({message:"the api records already were retrieved"});
            }
            
        }catch(error){
            next(error);
        }
    }
    /* route method to create records in Pokemon table */
    async create(req:Request, res:Response, next:NextFunction):Promise<void>{
        try{
            const body = req.body;
            /* call function to generate id for user created pokemon */
            let id = await keyGenerator.next();
            /* create record with body properties and with generated id */
            const pokemon = await this.repository.create?.({...body,id:id.value,origin:"custom"});
            res.status(200).json(pokemon);
        } catch(error){
            next(error);
        }
    }

    /* route method to list records */
    async list(
        req:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
        res:Response,next:NextFunction):Promise<void>{
        const {query} =  req;
        let pokemons;
        try{

            /* execute list method for list records filtered,sorted and with pagination by query data */
            pokemons = await this.repository.list(query.sorting,query.sortColumn,query.search,query.type,query.origin,query.page);
            
            res.status(200).json(pokemons);

        }catch(error){
            next(error);
        }
    }

    /* route method to retrieve records by id */
    async get(req:Request,res:Response, next:NextFunction): Promise<void>{
        try{
            const {pokeId} = req.params;
            const pokemon = await this.repository.get?.(pokeId);
            res.status(200).json(pokemon);
        }catch(error){
            next(error);
        }
    }

    /* route method to update pokemons in database */
    async update(req:Request,res:Response,next:NextFunction): Promise<void>{
        try{
            const {pokeId} = req.params;
            const body = req.body;
            /* update record using id with the data in the body of the request */
            const pokemon = await this.repository.update?.(pokeId,body);

            res.status(200).json(pokemon);
        }catch(error){
            next(error);
        }
    }
    
    /* route method to remove a record from Pokemon table using id */
    async remove(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {pokeId} = req.params;
            const pokemon = await this.repository.remove?.(pokeId);
            res.status(200).json(pokemon);
        }catch(error){
            next(error);
        }
    }
}