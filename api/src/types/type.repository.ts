import database from "../config/database";
import { DatabaseRepository, Query } from "../declaration";
import { Type } from "../entity/Type";
import { getApiTypes } from "../controllers/apiGetters";

export class TypeRepository implements DatabaseRepository<Type>{
    
    async download(): Promise<void> {
        await database.createQueryBuilder()
        .insert()
        .into(Type)
        .values(await getApiTypes()).execute();
    }

    async list(query?: Query | undefined): Promise<Type[]> {
        const repository = database.getRepository(Type);
        return repository.find();
    }

}