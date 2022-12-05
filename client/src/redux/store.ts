import {configureStore,combineReducers,ThunkAction,Action} from '@reduxjs/toolkit';
import logger from 'redux-logger'
import  pokemon  from "./pokemonSlice";

const reducer = combineReducers({
    pokemons:pokemon,
});

const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(),logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export default store;