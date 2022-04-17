import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export type CurrencyRate = {
  [k: string]: {code: string; rate: number};
};

export interface ratesSilce {
  status: 'idle' | 'loading' | 'failed';
  rates: {};
  currency: string;
}

const initialState: ratesSilce = {
  status: 'idle',
  rates: [],
  currency: 'usd',
};

export const fetchRatesAsync = createAsyncThunk(
  'rates/fetchRates',
  async (currency: string): Promise<CurrencyRate> => {
    const response = await fetch(
      `http://www.floatrates.com/daily/${currency}.json`,
    );

    return response.json();
  },
);

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRatesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRatesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.rates = action.payload;
      });
  },
});

export const {setCurrency} = ratesSlice.actions;

export const getRates = (state: RootState) => state.rates.rates;
export const getCurrency = (state: RootState) => state.rates.currency;

export default ratesSlice.reducer;
