/*************************************************
 * Country Explorer
 * @exports
 * useTheme.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {setTheme} from '../store/ThemeSlice';

const lightTheme = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
  border: '#000000',

  // other styles
};

const darkTheme = {
  primary: '#0A84FF',
  background: '#1C1C1E',
  text: '#FFFFFF',
  border: '#FFFFFF',

  // other styles
};
export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const colors = theme === 'light' ? lightTheme : darkTheme;

  /**
   * @function toggleTheme
   *  change the theme in user action
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return {theme, colors, toggleTheme};
};
