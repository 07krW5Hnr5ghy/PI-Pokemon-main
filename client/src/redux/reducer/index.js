import {
    GET_POKEMONS,
    GET_DETAIL,
    GET_TYPES,
    POST_CREATE,
    FILTER_TYPE,
} from "../actions/index";

const initialState = {
    pokemons: [],
    filteredPokemons:[],
    pokemonDetail: [],
    types:[],
};

export const reducerPokemon = (state = initialState,action) => {
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons:action.payload,
                filteredPokemons:action.payload,
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
        case POST_CREATE:
            return {
                ...state,
            };
        case FILTER_TYPE:
            const filteredPokemons = state.filteredPokemons;
            const results = action.payload === "all" ?
             filteredPokemons : filteredPokemons.filter((pokemon) => pokemon.classes.includes(action.payload));
            /*if(results.lenght === 0){
                results = "No pokemons found with the filter";
            }else{
                return {
                    ...state,
                    pokemons:results,
                };
            } */
            return {
                ...state,
                pokemons:!results.length ? "No pokemons found with the filter" : results,
            };
        default:
            return state;
    }
};