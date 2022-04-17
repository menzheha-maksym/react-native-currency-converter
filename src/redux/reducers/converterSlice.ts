import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface converterSlice {
  initialString: string;
  fromCurrency: string;
  toCurrency: string;
  value: number;
}

const initialState: converterSlice = {
  initialString: '',
  fromCurrency: '',
  toCurrency: '',
  value: 0,
};

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
});

export const {convert} = converterSlice.actions;

export const getConverter = (state: RootState) => state.converter;

export default converterSlice.reducer;
