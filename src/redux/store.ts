import {configureStore} from '@reduxjs/toolkit';
import pageReducer from './reducers/pageSlice';
import ratesReducer from './reducers/ratesSlice';
import converterReducer from './reducers/converterSlice';

const store = configureStore({
  reducer: {
    page: pageReducer,
    rates: ratesReducer,
    converter: converterReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
