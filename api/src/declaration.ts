/* Repository types */ 
export type Query = Record<string,unknown>;
export type Id = string | number;
export type Name = string;
export interface DatabaseRepository<T = unknown>{
    download(): Promise<void>;
    create?(data: T, query?: Query): Promise<T>;
    list(query?:Query): Promise<T[]>;
    get?(id:Id,query?:Query): Promise<T|null>;
    search?(name:Name,query?:Query):Promise<T[]>;
    update?(id:Id,data:T,query?:Query):Promise<T|null>;
    remove?(id:Id,query?:Query):Promise<T|null>;
}

/* entities types */
export enum Origin {
    API = "api" ,
    CUSTOM = "custom"
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

export interface Type{
    id:number;
    type:string;
}