/*************************************************
 * Country Explorer
 * @exports
 * CountrySlice.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/

import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {countryApi} from '../services/CountryServices';
import {Country} from '../services/CountryModel';

type CountryState = {
  allCountryList: Country[];
  favoriteList: Country[];
  cacheCountryList: Country[];
  isPullToRefreshLoading: boolean;
};
const initialState: CountryState = {
  allCountryList: [],
  favoriteList: [],
  cacheCountryList: [],
  isPullToRefreshLoading: false,
};
type AddRemoveFavoritePayload = {
  country: Country;
  name: string;
};

/**
 * @function updateFavoriteItemCountryList
 * @param {Array, string, boolean} - country list
 * @return {Array} country
 * update Favorite Item in Country List
 */
const updateFavoriteItemCountryList = (
  countryList: Country[],
  name: string,
  isFavorite: boolean,
): Country[] => {
  return countryList.map(item => {
    if (item.name === name) {
      return {
        ...item,
        isFavorite,
      };
    }
    return item;
  });
};

/**
 * @function updateFavoriteItemCountryList
 * @param {Array, Array} - favorite and country list
 * @return {Array} country
 * update Favorite array to Country List
 */
const updateFavoriteListToCountryList = (
  countryList: Country[],
  favoriteList: Country[],
): Country[] => {
  if (favoriteList.length > 0) {
    return countryList.map(item => {
      const isFavorite = favoriteList.some(
        favorite => favorite.name === item.name,
      );
      return {...item, isFavorite};
    });
  } else {
    return countryList;
  }
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<AddRemoveFavoritePayload>) => {
      state.favoriteList.push({...action.payload.country, isFavorite: true});

      state.allCountryList = updateFavoriteItemCountryList(
        state.allCountryList,
        action.payload.name,
        true,
      );
      state.cacheCountryList = updateFavoriteItemCountryList(
        state.cacheCountryList,
        action.payload.name,
        true,
      );
    },
    removeFavorite: (
      state,
      action: PayloadAction<AddRemoveFavoritePayload>,
    ) => {
      let filterList = state.favoriteList.filter(
        favorite => favorite.name !== action.payload.name,
      );
      state.favoriteList = filterList;

      state.allCountryList = updateFavoriteItemCountryList(
        state.allCountryList,
        action.payload.name,
        false,
      );
      state.cacheCountryList = updateFavoriteItemCountryList(
        state.cacheCountryList,
        action.payload.name,
        false,
      );
    },
    updateCacheToOriginalList: state => {
      state.allCountryList = state.cacheCountryList;
    },
    invokePullToRefresh: state => {
      state.isPullToRefreshLoading = true;
    },
    setSearchCacheData: (state, action) => {
      state.allCountryList = updateFavoriteListToCountryList(
        action.payload,
        state.favoriteList,
      );
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      countryApi.endpoints.getCountry.matchFulfilled,
      (state, {payload}) => {
        state.allCountryList = updateFavoriteListToCountryList(
          payload,
          state.favoriteList,
        );
        state.cacheCountryList = updateFavoriteListToCountryList(
          payload,
          state.favoriteList,
        );
        state.isPullToRefreshLoading = false;
      },
    );
    builder.addMatcher(
      countryApi.endpoints.getCountry.matchRejected,
      (state, {}) => {
        state.allCountryList = [];
        state.isPullToRefreshLoading = false;
      },
    );
    builder.addMatcher(
      countryApi.endpoints.searchCountry.matchFulfilled,
      (state, {payload}) => {
        state.allCountryList = updateFavoriteListToCountryList(
          payload,
          state.favoriteList,
        );
      },
    );
    builder.addMatcher(
      countryApi.endpoints.searchCountry.matchRejected,
      (state, {}) => {
        state.allCountryList = [];
      },
    );
  },
});

export const {
  addFavorite,
  removeFavorite,
  updateCacheToOriginalList,
  invokePullToRefresh,
  setSearchCacheData,
} = countrySlice.actions;

export default countrySlice.reducer;
