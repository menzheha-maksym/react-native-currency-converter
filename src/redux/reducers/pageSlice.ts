import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface PageState {
  name: string;
  title: string;
}

const initialState: PageState = {
  name: 'Converter',
  title: 'Converter',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    moveToExchangeRates: state => {
      state.name = 'ExchangeRates';
      state.title = 'Exchange Rates';
    },
    moveToConverter: state => {
      state.name = 'Converter';
      state.title = 'Converter';
    },
  },
});

export const {moveToConverter, moveToExchangeRates} = pageSlice.actions;

export const selectPage = (state: RootState) => state.page;

export default pageSlice.reducer;
