import {createSlice} from "@reduxjs/toolkit";
import { Filters, Pokemon,Type } from "../interfaces";
import { RootState } from "./store";

export interface PokemonsState{
    data:{
        records:Pokemon[],
        currentPage:number,
        last_page:number,
        total:number,
    },
    detail:Pokemon,
    types:Type[],
    filters:Filters,
    status:'idle' | 'loading' | 'failed',
}

const initialState : PokemonsState = {
    data:{
        records:[],
        currentPage:1,
        last_page:1,
        total:1,
    },
    detail:{
        name:"",
        id:"",
        classes:[],
        specialAttack:0,
        specialDefense:0,
        speed:0,
        health:0,
        attack:0,
        defense:0,
        picture:"",
        origin:"",
        createdAt:"",
        updatedAt:"",
    },
    types:[],
    filters:{
        search:"",
        type:"",
        origin:"",
        sort:"",
        column:"",
        page:1,
        pageIndex:0,
        paginationStart:0,
        paginationEnd:9,
    },
    status:'idle',
};

export const PokemonSlice = createSlice({
    name:'pokemon',
    initialState,
    reducers:{
        fetchDB: (state,action) => {
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
        setFilterData: (state,action) => {
            state.filters = {...state.filters,...action.payload};
        },
        setSearchData: (state,action) => {
            state.filters.search = action.payload;
            state.filters.page = 1;
        },
        removeData: (state,action) => {
            state.data.records = state.data.records.filter((item) => item.id !== action.payload);
            state.filters.page =1;
        }
    }
})

export const {fetchDB,fetchDetail,fetchTypes,flushDetail,setFilterData,setSearchData,removeData} = PokemonSlice.actions;
export const selectPokemons = (state:RootState) => state.pokemons.data;
export default PokemonSlice.reducer;

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