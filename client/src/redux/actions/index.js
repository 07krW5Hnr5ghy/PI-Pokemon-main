import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";

export const getPokemons = () => {
    return async (dispatch) => {
        const request = await axios('http://localhost:3001/pokemons');
        console.log("getPokemons");
        const data = request.data;
        return dispatch({
            type:GET_POKEMONS,
            payload:data,
        });
    }
}