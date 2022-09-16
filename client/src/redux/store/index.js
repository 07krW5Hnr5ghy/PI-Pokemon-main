import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { reducerPokemon } from "../reducer";
import { combineReducers } from 'redux'

const reducer = combineReducers({
    reducerPokemon,
})

const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(),logger],
});

export default store;