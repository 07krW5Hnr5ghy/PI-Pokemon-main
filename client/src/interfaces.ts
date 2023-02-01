export interface Pokemon{
    name:string;
    id:string;
    classes:string[];
    specialAttack:number;
    specialDefense:number;
    speed:number;
    health:number;
    attack:number;
    defense:number;
    picture:string;
    origin:string;
    createdAt:string;
    updatedAt:string;
}

export interface Type{
    id:number;
    type:string;
    createdAt:string;
}

export interface Filters{
    type:string;
    origin:string;
    sort:string;
    column:string;
    page:number;
    pageIndex:number;
    paginationStart:number;
    paginationEnd:number;
}