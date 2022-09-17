import {
    GET_POKEMONS,
    GET_DETAIL,
    GET_TYPES,
} from "../actions/index";

const initialState = {
    pokemons: [],
    pokemonDetail: [],
    types:[],
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
        case GET_TYPES:
            return {
                ...state,
                types:action.payload,
            };
        default:
            return state;
    }
};