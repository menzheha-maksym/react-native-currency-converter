import {configureStore} from '@reduxjs/toolkit';
import pageReducer from './reducers/pageSlice';
import ratesReducer from './reducers/ratesSlice';

const store = configureStore({
  reducer: {
    page: pageReducer,
    rates: ratesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
