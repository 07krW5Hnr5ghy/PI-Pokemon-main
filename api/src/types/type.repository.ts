import database from "../config/database";
import { DatabaseRepository,Sorting,Name } from "../declaration";
import { Type } from "../entity/Type";
import { getApiTypes } from "../apicalls/apiGetters";

export class TypeRepository implements DatabaseRepository<Type>{
    /* method to insert data from remote api in Types table */
    async download(): Promise<void> {
        await database.createQueryBuilder()
        .insert()
        .into(Type)
        .values(await getApiTypes()).execute();
    }
    /* method to list the data from Types table */
    async list(): Promise<Type[]> {
        const repository = database.getRepository(Type);
        return repository.find();
    }

}