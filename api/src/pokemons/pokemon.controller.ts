import {Request,Response,NextFunction} from "express";
import { DatabaseRepository } from "../declaration";
import { keyGenerator } from "../utils/utils";
import {Pokemon} from "../entity/Pokemon";
import {RequestParams,RequestBody,ResponseBody,RequestQuery,Origin } from "../declaration";



export class PokemonController{
    constructor(private repository:DatabaseRepository<Pokemon>){}

    async download(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            let data = await this.repository.download(); 
            res.status(200).json(data);
        }catch(error){
            next(error);
        }
    }

    async create(req:Request, res:Response, next:NextFunction):Promise<void>{
        try{
            const body = req.body;
            let id = await keyGenerator.next();
            const pokemon = await this.repository.create?.({...body,id:id.value,origin:"custom"});
            res.status(200).json(pokemon);
        } catch(error){
            next(error);
        }
    }

    async list(
        req:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
        res:Response,next:NextFunction):Promise<void>{
        const {query} =  req;
        let pokemons;
        try{

            pokemons = await this.repository.list(query.sorting,query.sortColumn,query.search,query.type,query.origin,query.page);
            
            res.status(200).json(pokemons);

        }catch(error){
            next(error);
        }
    }

    async get(req:Request,res:Response, next:NextFunction): Promise<void>{
        try{
            const {pokeId} = req.params;
            const pokemon = await this.repository.get?.(pokeId);
            res.status(200).json(pokemon);
        }catch(error){
            next(error);
        }
    }

    async update(req:Request,res:Response,next:NextFunction): Promise<void>{
        try{
            const {pokeId} = req.params;
            const body = req.body;
            
            const pokemon = await this.repository.update?.(pokeId,body);

            res.status(200).json(pokemon);
        }catch(error){
            next(error);
        }
    }

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