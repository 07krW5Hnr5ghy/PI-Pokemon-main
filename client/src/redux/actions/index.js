import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";

export const getPokemons = () => {
    return async (distpach) => {
        const request = await axios('/pokemons');
        const data = request.data;
        return distpach({
            type:GET_POKEMONS,
            payload:data,
        });
    }
}