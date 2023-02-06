import axios from "axios";
import { 
    fetchDB,
    fetchDetail,
    fetchTypes,
    flushDetail,
    setFilterData,
    setSearchData } from "./pokemonSlice";
import type {AppDispatch} from '../redux/store';
import { Filters,Pokemon } from "../interfaces";

export const getAPIData = () => {
    axios(`/api/p-data`)
    .then(res => console.log(res))
    .catch(e => console.log(e));
}

export const getDBPokemons = (page?:number,search?:string,type?:string,sorting?:string,sortColumn?:string,origin?:string) => {
   return (dispatch:AppDispatch) => {
    axios(`/api/pokemons?search=${search || ""}&type=${type || ""}&sorting=${sorting || ""}&sortColumn=${sortColumn || ""}&origin=${origin || ""}&page=${page || 1}`)
    .then(res => dispatch(fetchDB(res.data)))
    .catch(e => console.log(e));
   }
} 

export const getDetail = (id: string) => {
    return (dispatch:AppDispatch) => {
        axios(`/api/pokemons/${id}`)
        .then(res => dispatch(fetchDetail(res.data)))
        .catch(e => console.log(e));
    }
}

export const getTypes = () => {
    return (dispatch:AppDispatch) => {
        axios(`/api/types`)
        .then(res => dispatch(fetchTypes(res.data)))
        .catch(e => console.log(e));
    }
}

export const resetDetail = () => {
    return (dispatch:AppDispatch) => {
        dispatch(flushDetail([]));
    }
}

export const updateFilter = (filters:Partial<Filters>) => {
    return (dispatch:AppDispatch) => {
        dispatch(setFilterData(filters));
    }
}

export const updateSearch = (name:string) => {
    return (dispatch:AppDispatch) => {
        dispatch(setSearchData(name));
    }
}

export const addPokemon = (pokemon:Partial<Pokemon>) => {
    return(dispatch:AppDispatch) => {
        axios.post(`/api/pokemons`,pokemon)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }
}