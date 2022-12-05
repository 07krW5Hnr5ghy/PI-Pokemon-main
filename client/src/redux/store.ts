import {configureStore,combineReducers,ThunkAction,Action} from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { useDispatch } from 'react-redux';
import { pokemons } from "./pokemonSlice";

const reducer = combineReducers({
    pokemons:pokemons,
});

const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(),logger],
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export default store;