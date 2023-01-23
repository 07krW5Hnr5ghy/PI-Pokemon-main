
export type Origin = "api" | "custom";
export type Query = Record<string,unknown>;
export type Id = string | number;
export interface DatabaseRepository<T = unknown>{
    create(data: T, query?: Query): Promise<T>;
    list(query?:Query): Promise<T[]>;
    get(id:Id,query?:Query): Promise<T|null>;
    update(id:Id,data:T,query?:Query):Promise<T|null>;
    remove(id:Id,query?:Query):Promise<T|null>;
}
export interface Pokemon{
    id:string;
    name:string;
    classes:string[];
    attack:number;
    defense:number;
    specialAttack:number;
    specialDefense:number;
    health:number;
    speed:number;
    picture:string;
    origin:Origin;
}