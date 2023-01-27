import database from "../config/database";
import { DatabaseRepository, Query,Sorting,Name } from "../declaration";
import { Type } from "../entity/Type";
import { getApiTypes } from "../apicalls/apiGetters";

export class TypeRepository implements DatabaseRepository<Type>{
    
    async download(): Promise<void> {
        await database.createQueryBuilder()
        .insert()
        .into(Type)
        .values(await getApiTypes()).execute();
    }

    async list(sorting?:Sorting,column?:string,name?:Name): Promise<Type[]> {
        const repository = database.getRepository(Type);
        return repository.find();
    }

}