import { Request,Response,NextFunction } from "express";
import { DatabaseRepository } from "../declaration";
import { Type } from "../entity/Type";
import { getApiTypes } from "../apicalls/apiGetters";
import { Sorting,RequestParams,RequestBody,ResponseBody,RequestQuery } from "../declaration";

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

    async list(req:Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,res:Response,next:NextFunction):Promise<void>{
        const {query} =  req;
        try{
            const types = await this.repository.list(query.sorting,query.sortColumn,query.search);
            res.status(200).json(types);
        }catch(error){
            next(error);
        }
    }
}