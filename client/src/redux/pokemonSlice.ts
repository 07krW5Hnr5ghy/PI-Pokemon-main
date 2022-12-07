import {createSlice} from "@reduxjs/toolkit";
import { Pokemon } from "../interfaces";
import { RootState } from "./store";

/*export const reducerPokemon = (state = initialState,action) => {
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
        case UPDATE_POKEMON:
            console.log("UPDATE");
            return{
                ...state,
            };
        default:
            return state;
    }
};*/

export interface PokemonsState{
    data:Pokemon[],
    detail:Pokemon,
    types:string[],
    status:'idle' | 'loading' | 'failed',
}

const initialState : PokemonsState = {
    data:[],
    detail:{
        name:"",
        id:"",
        classes:[],
        height:0,
        weight:0,
        speed:0,
        hp:0,
        attack:0,
        defense:0,
        img:"",
        origin:"",
        createdAt:"",
        updatedAt:"",
    },
    types:[],
    status:'idle',
};

export const PokemonSlice = createSlice({
    name:'pokemon',
    initialState,
    reducers:{
        fetchPokemons: (state,action) => {
            state.data = action.payload;
        },
        fetchDetail: (state,action) => {
            state.detail = action.payload;
        },
        fetchTypes: (state,action) => {
            state.types = action.payload;
        },
        flushDetail: (state,action) => {
            state.detail = action.payload;
        },
        flushRecord: (state,action) => {
            state.data = state.data.filter(record => action.payload !== record.id);
        }
    }
})

export const {fetchPokemons,fetchDetail,fetchTypes,flushDetail,flushRecord} = PokemonSlice.actions;
export const selectPokemons = (state:RootState) => state.pokemons.data;
export default PokemonSlice.reducer;
