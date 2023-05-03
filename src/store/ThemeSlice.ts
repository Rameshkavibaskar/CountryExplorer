/* eslint-disable react-hooks/rules-of-hooks */
/*************************************************
 * Country Explorer
 * @exports
 * ThemeSlice.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/

import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {useColorScheme} from 'react-native';

type ThemeState = {
  mode: string;
};
const initialState: ThemeState = {
  mode: useColorScheme() === 'dark' ? 'dark' : 'light',
};
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
  },
});
export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
