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
    search:string;
    type:string;
    origin:string;
    sort:string;
    column:string;
    page:number;
    pageIndex:number;
    paginationStart:number;
    paginationEnd:number;
}

export interface Stats{
    subject:string;
    points:number;
}

export type FormData = {
    name:string,
    classes:string[],
    attack:number,
    defense:number,
    specialAttack:number,
    specialDefense:number,
    speed:number,
    health:number,
    picture:string,
}

export const INITIAL_DATA : FormData = {
    name:"",
    classes:[],
    attack:0,
    defense:0,
    specialAttack:0,
    specialDefense:0,
    speed:0,
    health:0,
    picture:"",
}

export interface ValidateData {
    name: string;
    picture: string;
}

export const ERROR_CHECKING : ValidateData = {
    name:"",
    picture:"",
}