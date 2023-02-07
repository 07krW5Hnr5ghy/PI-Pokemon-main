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