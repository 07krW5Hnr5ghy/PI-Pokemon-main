export interface Pokemon{
    name:string;
    id:string;
    classes:string[];
    specialAttack:number;
    specialDefense:number;
    speed:number;
    hp:number;
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