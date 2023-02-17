import { ReactNode } from "react";
/* Database entities interfaces */
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

/* filter object sended to backend */

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

/* format for stats in details chart */

export interface Stats{
    subject:string;
    points:number;
}

/* format for create and update pokemon form */
export interface FormData{
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

/* template of empty pokemon for initialize form */
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

/* structure of form validation object */
export interface ValidateData {
    name: string;
    picture: string;
}

/* default state of form validation object */
export const ERROR_CHECKING : ValidateData = {
    name:"",
    picture:"",
}

/* Form Wrapper interface */
export interface FormWrapperProps{
    title:string,
    children:ReactNode,
}

/* form first step definitions */
type StepOneData = {
    name:string,
    classes:string[],
}

export type StepOneProps = StepOneData & {
    updateFields:(fields:Partial<StepOneData>) => void,
    checkFields:(e:React.ChangeEvent<HTMLInputElement>) => void,
    detail:Pokemon,
    id:string,
}

/* form second step definitions */
type StepTwoData = {
    attack:number,
    defense:number,
}

export type StepTwoProps = StepTwoData & {
    updateFields:(fields:Partial<StepTwoData>) => void,
    detail:Pokemon,
    id:string,
}

/* form third step definitions */
type StepThreeData = {
    specialAttack:number,
    specialDefense:number,
}

export type StepThreeProps = StepThreeData & {
    updateFields:(fields:Partial<StepThreeData>) => void,
    detail:Pokemon,
    id:string,
}

/* form fourth step definitions */
type StepFourData = {
    speed:number,
    health:number,
}

export type StepFourProps = StepFourData & {
    updateFields:(fields:Partial<StepFourData>) => void,
    detail:Pokemon,
    id:string,
}

/* form five step definitions */
type StepFiveData = {
    picture:string,
}

export type StepFiveProps = StepFiveData & {
    updateFields:(fields:Partial<StepFiveData>) => void,
    checkFields:(e:React.ChangeEvent<HTMLInputElement>) => void,
    detail:Pokemon,
}