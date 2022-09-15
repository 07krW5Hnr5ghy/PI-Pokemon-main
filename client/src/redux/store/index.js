import {configureStore} from '@reduxjs/toolkit';
import { reducerPokemon } from "../reducer";
import { combineReducers } from 'redux'

const reducer = combineReducers({
    reducerPokemon,
})

const store = configureStore({
    reducer,
});

export default store;