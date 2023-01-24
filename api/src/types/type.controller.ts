import { Request,Response,NextFunction } from "express";
import { DatabaseRepository } from "../declaration";
import { Type } from "../entity/Type";
import { getApiTypes } from "../controllers/apiGetters";

export class TypeController{
    constructor(private repository:DatabaseRepository<Type>){}

    async download(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            let data = await this.repository.download();
            res.status(200).json(data);
        }catch(error){
            next(error);
        }
    }

    async list(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const types = await this.repository.list();
            res.status(200).json(types);
        }catch(error){
            next(error);
        }
    }
}