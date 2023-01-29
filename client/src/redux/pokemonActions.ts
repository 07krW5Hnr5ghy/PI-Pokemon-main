import axios from "axios";
import { fetchDB,fetchDetail,fetchTypes,flushDetail,flushRecord } from "./pokemonSlice";
import type {AppDispatch} from '../redux/store';

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

export const deleteRecord = (id:string) => {
    return (dispatch:AppDispatch) => {
        axios.delete(`/pokemons/${id}`);
        dispatch(flushRecord(id));
    }
}
/*export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_NAME = "GET_NAME";
export const GET_TYPES = "GET_TYPES";
export const POST_CREATE = "POST_CREATE";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_ATTACK = "ORDER_ATTACK";
export const FLUSH_DETAIL = "FLUSH_DETAIL";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const FLUSH_POKEMONS = "FLUSH_POKEMONS";
export const UPDATE_POKEMON = "UPDATE_POKEMON";

export const getPokemons = (name) => {
    return async (dispatch) => {
        if(name){
            const request = await axios(`/pokemons?name=${name}`);
            return dispatch({
                type:GET_POKEMONS,
                payload:request.data,
            });
        }else{
            const request = await axios('/pokemons');
            return dispatch({
                type:GET_POKEMONS,
                payload:request.data,
            });
        }
        
    }
}

export const getDetail = (id) => {
    return async(dispatch) => {
        const request = await axios(`/pokemons/${id}`);
        return dispatch({
            type:GET_DETAIL,
            payload:request.data,
        });
    }
}

export const getTypes = () => {
    return async(dispatch) => {
        const request = await axios(`/types`);
        return dispatch({
            type:GET_TYPES,
            payload:request.data,
        });
    }
}

export const postCreate = (pokemon) => {
    return async (dispatch) => {
        const request = await axios.post(`/pokemons`,pokemon);
        return dispatch({
            type:POST_CREATE,
            payload: request.data,
        });
    }
}

export const filterTypes = (filter) => {
    return {
        type:FILTER_TYPES,
        payload:filter,
    };
}

export const filterOrigin = (filter) => {
    return {
        type:FILTER_ORIGIN,
        payload:filter,
    };
}


export const orderName = (order) => {
    return {
        type:ORDER_NAME,
        payload:order,
    };
}

export const orderAttack = (order) => {
    return {
        type:ORDER_ATTACK,
        payload:order,
    };
}

export const flushDetail = () => {
    return {
        type:FLUSH_DETAIL,
        payload:[],
    };
}

export const deletePokemon = (id) => {
    return async (dispatch) => {
        await axios.delete(`/pokemons/${id}`);
        return {
            type:DELETE_POKEMON,
            payload:id,
        };
    }
}

export const flushPokemons = () => {
    return {
        type:FLUSH_POKEMONS,
        payload:[],
    }
}

export const updatePokemon = (pokemon) => {
    return async (dispatch) => {
        const request = await axios.put(`/pokemons/`,pokemon);
        return{
            type:UPDATE_POKEMON,
            payload:request.data,
        }
    }
}*/
