import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_NAME = "GET_NAME";
export const GET_TYPES = "GET_TYPES";
export const POST_CREATE = "POST_CREATE";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_ATTACK = "ORDER_ATTACK";
export const FLUSH_DETAIL = "FLUSH_DETAIL";

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
    return async(dispatch) => {
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
