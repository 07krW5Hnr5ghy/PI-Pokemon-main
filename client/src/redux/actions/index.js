import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAIL = "GET_DETAIL";

export const getPokemons = () => {
    return async (dispatch) => {
        const request = await axios('http://localhost:3001/pokemons');
        return dispatch({
            type:GET_POKEMONS,
            payload:request.data,
        });
    }
}

export const getDetail = (id) => {
    return async(dispatch) => {
        const request = await axios(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
            type:GET_DETAIL,
            payload:request.data,
        });
    }
}