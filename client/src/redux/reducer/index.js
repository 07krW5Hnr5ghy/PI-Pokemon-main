import {
    GET_POKEMONS,
    GET_DETAIL,
    GET_TYPES,
    POST_CREATE,
    FILTER_TYPES,
    ORDER_NAME,
    ORDER_ATTACK,
    FILTER_ORIGIN,
    FLUSH_DETAIL,
    DELETE_POKEMON,
    FLUSH_POKEMONS,
} from "../actions/index";

const initialState = {
    pokemons: [],
    filteredPokemons:[],
    pokemonDetail: [],
    types:[],
    id:"",
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
        case FILTER_TYPES:
            const filteredTypes = state.filteredPokemons;
            const resultsTypes = action.payload === "all" ?
             filteredTypes : filteredTypes.filter((pokemon) => pokemon.classes.includes(action.payload));
            return {
                ...state,
                pokemons:!resultsTypes.length ? "No pokemons found with types filter" : resultsTypes,
            };
        case FILTER_ORIGIN:
            const filteredCustoms = state.filteredPokemons;
            const resultsCustoms = filteredCustoms.filter((pokemon) => pokemon.origin === action.payload);
            return {
                ...state,
                pokemons:!resultsCustoms.length ? "No pokemons found with origin filter" : resultsCustoms,
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
        case FLUSH_DETAIL:
            return{
                ...state,
                pokemonDetail:action.payload,
            };
        case DELETE_POKEMON:
            return{
                ...state,
                id:action.payload,
            };
        case FLUSH_POKEMONS:
            return{
                ...state,
                pokemons:action.payload,
            };
        default:
            return state;
    }
};