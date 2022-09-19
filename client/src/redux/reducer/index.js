import {
    GET_POKEMONS,
    GET_DETAIL,
    GET_TYPES,
    POST_CREATE,
    FILTER,
    ORDER_NAME,
    ORDER_ATTACK,
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
        case FILTER:
            const filteredPokemons = state.filteredPokemons;
            const results = action.payload === "all" ?
             filteredPokemons : filteredPokemons.filter((pokemon) => pokemon.classes.includes(action.payload));
            return {
                ...state,
                pokemons:!results.length ? "No pokemons found with the filter" : results,
            };
        case ORDER_NAME:
            const unorderedNames = [...state.pokemons];
            action.payload === "asc" ? 
            unorderedNames.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)) : 
            unorderedNames.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1));

            return{
                ...state,
                pokemons:[...unorderedNames],
            };
        case ORDER_ATTACK:
            const unorderedAttack = [...state.pokemons];
            action.payload === "asc" ?
            unorderedAttack.sort((a,b) => a.attack-b.attack) : unorderedAttack.sort((a,b) => b.attack-a.attack);
            return{
                ...state,
                pokemons:[...unorderedAttack],
            };
        default:
            return state;
    }
};