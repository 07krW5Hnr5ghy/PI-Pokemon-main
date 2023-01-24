import {Request,Response,NextFunction} from "express";
import { DatabaseRepository } from "../declaration";
import {Pokemon} from "../entity/Pokemon";

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
            const pokemon = await this.repository.create?.(body);
            res.status(200).json(pokemon);
        } catch(error){
            next(error);
        }
    }

    async list(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const pokemons = await this.repository.list();
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