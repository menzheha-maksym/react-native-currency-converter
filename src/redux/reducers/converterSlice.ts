import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {CurrencyRate} from './ratesSlice';

export interface converterSlice {
  status: 'idle' | 'loading' | 'failed';
  initialString: string;
  fromCurrency: string;
  toCurrency: string;
  value: number;
  result: string;
}

const initialState: converterSlice = {
  status: 'idle',
  initialString: '',
  fromCurrency: '',
  toCurrency: '',
  value: 0,
  result: '',
};

export const fetchRatesAndConvertAsync = createAsyncThunk(
  'convert/fetchAndConvert',
  async (currency: string): Promise<CurrencyRate> => {
    const response = await fetch(
      `http://www.floatrates.com/daily/${currency}.json`,
    );

    return response.json();
  },
);

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    convert: (state, action: PayloadAction<string>) => {
      let currencies = action.payload.split('"');
      if (currencies.length !== 5) {
        throw 'enter a valid string to convert, (ex "15 usd" in "uah")';
      }

      currencies = currencies?.slice(1, currencies.length - 1);
      const value = Number(currencies[0].split(' ')[0]);
      const fromCurrency = currencies[0].split(' ')[1];
      const toCurrency = currencies[2];
      if (isNaN(value)) {
        throw 'enter a valid string to convert, (ex "15 usd" in "uah")';
      }

      state.value = value;
      state.fromCurrency = fromCurrency;
      state.toCurrency = toCurrency;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRatesAndConvertAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRatesAndConvertAsync.fulfilled, (state, action) => {
        const value = state.value;
        const currencyInfo = action.payload[state.toCurrency];
        const converted = value * currencyInfo.rate;

        state.status = 'idle';
        state.result = `${value} ${state.fromCurrency.toUpperCase()} = ${converted.toFixed(
          2,
        )} ${currencyInfo.code}`;
      });
  },
});

export const {convert} = converterSlice.actions;

export const getConverter = (state: RootState) => state.converter;

export default converterSlice.reducer;
