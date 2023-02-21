import axios from "axios";
import { 
    fetchDB,
    fetchDetail,
    fetchTypes,
    flushDetail,
    removeData,
    setFilterData,
    setSearchData,
    setStatus
 } from "./pokemonSlice";
import type {AppDispatch} from '../redux/store';
import { Filters,Pokemon } from "../tools/interfaces";
import { initialState } from "./pokemonSlice";
import 'react-toastify/dist/ReactToastify.css';

/* send signal to fetch data from remote api to backend */
export const getAPIData = () => {
    axios(`/p-data`)
    .then(res => console.log(res))
    .catch(e => console.log(e));
}

/* fetch pokemon data from backend */
export const getDBPokemons = (page?:number,search?:string,type?:string,sorting?:string,sortColumn?:string,origin?:string) => {
    console.log("search",search);
    console.log("type",type);
    console.log("sorting",sorting);
    console.log("sortColumn",sortColumn);
    console.log("origin",origin);
   return (dispatch:AppDispatch) => {
    axios(`/pokemons?search=${search || ""}&type=${type || ""}&sorting=${sorting || ""}&sortColumn=${sortColumn || ""}&origin=${origin || ""}&page=${page || 1}`)
    .then((res) => {
        console.log("response",res.data);
        if(res.data.total === 0){
            dispatch(setStatus("failed"));
            dispatch(fetchDB(initialState.data));
        }else{
            dispatch(setStatus("idle"));
            dispatch(fetchDB(res.data));
        }
    })
    .catch(e => console.log(e));
   }
} 

/* fetch from a pokemon using id */
export const getDetail = (id: string) => {
    return (dispatch:AppDispatch) => {
        axios(`/pokemons/${id}`)
        .then(res => dispatch(fetchDetail(res.data)))
        .catch(e => console.log(e));
    }
}

/* fetch types data from backend */
export const getTypes = () => {
    return (dispatch:AppDispatch) => {
        axios(`/types`)
        .then(res => dispatch(fetchTypes(res.data)))
        .catch(e => console.log(e));
    }
}

/* reset detail state to empty state */
export const resetDetail = () => {
    return (dispatch:AppDispatch) => {
        dispatch(flushDetail([]));
    }
}

/* update filter state in redux */
export const updateFilter = (filters:Partial<Filters>) => {
    return (dispatch:AppDispatch) => {
        dispatch(setFilterData(filters));
    }
}

/* update search term in redux state */
export const updateSearch = (name:string) => {
    return (dispatch:AppDispatch) => {
        dispatch(setSearchData(name));
    }
}

/* send data to create new pokemon in backend database */
export const addPokemon = (pokemon:Partial<Pokemon>) => {
    return(dispatch:AppDispatch) => {
        axios.post(`/pokemons`,pokemon)
        .then(res => {
            console.log(res)
        })
        .catch(e => console.log(e));
    }
}

/* mark pokemon to delete in database */
export const removePokemon = (id:string) => {
    return(dispatch:AppDispatch) => {
        axios.put(`/pokemons/${id}`,{active:false})
        .then((res) => {
            console.log(res)
            dispatch(removeData(id));
        })
        .catch(e => console.log(e));
    }
}

/* update pokemon record in database */
export const updatePokemon = (id:string,data:Partial<Pokemon>) => {
    return(dispatch:AppDispatch) => {
        axios.put(`/pokemons/${id}`,data)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }
}