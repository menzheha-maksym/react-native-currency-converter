import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Page} from '../../components/MoveTo';
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
    moveToPage: (state, action: PayloadAction<Page>) => {
      state.name = action.payload.name;
      state.title = action.payload.title;
    },
  },
});

export const {moveToPage} = pageSlice.actions;

export const selectPage = (state: RootState) => state.page;

export default pageSlice.reducer;
