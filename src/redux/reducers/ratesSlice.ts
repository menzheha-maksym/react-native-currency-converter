import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface ratesSilce {
  status: 'idle' | 'loading' | 'failed';
  rates: Array<{}>;
}

const initialState: ratesSilce = {
  status: 'idle',
  rates: [],
};

export const fetchRatesAsync = createAsyncThunk(
  'converter/fetchRates',
  async (currency: string): Promise<[{[k: string]: {code: string}}]> => {
    const response = await fetch(
      `http://www.floatrates.com/daily/${currency}.json`,
    );

    return response.json();
  },
);

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {},
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

export const getRates = (state: RootState) => state.rates.rates;

export default ratesSlice.reducer;
