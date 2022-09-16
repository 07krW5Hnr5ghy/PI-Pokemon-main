import {
    GET_POKEMONS,
    GET_DETAIL,
} from "../actions/index";

const initialState = {
    pokemons: [],
    pokemonDetail: [],
};

export const reducerPokemon = (state = initialState,action) => {
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons:action.payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                pokemonDetail:action.payload,
            };
        default:
            return state;
    }
};