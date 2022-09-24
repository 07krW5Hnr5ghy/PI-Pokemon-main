import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_NAME = "GET_NAME";
export const GET_TYPES = "GET_TYPES";
export const POST_CREATE = "POST_CREATE";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_CUSTOM = "FILTER_CUSTOM";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_ATTACK = "ORDER_ATTACK";

export const getPokemons = (name) => {
    return async (dispatch) => {
        if(name){
            const request = await axios(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type:GET_POKEMONS,
                payload:request.data,
            });
        }else{
            const request = await axios('http://localhost:3001/pokemons');
            return dispatch({
                type:GET_POKEMONS,
                payload:request.data,
            });
        }
        
    }
}

export const getDetail = (id) => {
    console.log("getDetail");
    return async(dispatch) => {
        const request = await axios(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
            type:GET_DETAIL,
            payload:request.data,
        });
    }
}

export const getTypes = () => {
    return async(dispatch) => {
        const request = await axios(`http://localhost:3001/types`);
        return dispatch({
            type:GET_TYPES,
            payload:request.data,
        });
    }
}

export const postCreate = (pokemon) => {
    return async(dispatch) => {
        const request = await axios.post(`http://localhost:3001/pokemons`,pokemon);
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

export const filterCustom = (filter) => {
    return {
        type:FILTER_CUSTOM,
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
