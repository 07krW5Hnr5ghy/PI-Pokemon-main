import {configureStore,combineReducers,ThunkAction,Action} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'
import  pokemon  from "./pokemonSlice";

const persistConfig = {
  key:'root',
  storage,
};

const reducer = combineReducers({
  pokemons:pokemon,
});

const persistedReducer = persistReducer(persistConfig,reducer);



const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(),logger],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export {store,persistor};