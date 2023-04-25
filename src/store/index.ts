/*************************************************
 * Country Explorer
 * @exports
 * index.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {api} from '../services/Api';
import country from './CountrySlice';
import theme from './ThemeSlice';

const reducers = combineReducers({
  api: api.reducer,
  country,
  theme,
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware().concat(api.middleware);
    return middlewares;
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export {store};
