/* Repository types */ 
export type Query = Record<string,unknown>;
export type Id = string | number;
export type Name = string;
export type Sorting = "ASC" | "DESC";
export type Column = string | number;
export interface DatabaseRepository<T = unknown>{
    download(): Promise<void>;
    create?(data: T, query?: Query): Promise<T>;
    list(sorting?:Sorting,column?:string,name?:Name,type?:string,origin?:Origin,page?:number): Promise<Data | T[]>;
    get?(id:Id,query?:Query): Promise<T|null>;
    search?(name:Name):Promise<T[]>;
    sort?(sorting:Sorting,column:Column):Promise<T[]>;
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

/* express types */
export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery{
    search:string;
    sorting:Sorting;
    sortColumn:string;
    type:string;
    origin:Origin;
    page:number;
}

export interface Data{
    data:Pokemon[];
    total:number;
    currentPage:number;
    last_page:number;
}