/* eslint-disable react-hooks/exhaustive-deps */
/*************************************************
 * Country Explorer
 * @exports
 * HomeScreen.tsx
 * Created by Ramesh on 25/04/2023
 *************************************************/

import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Keyboard,
} from 'react-native';
import {navigate} from '../navigators/NavigationUtils';
import {
  useLazyGetCountryQuery,
  useLazySearchCountryQuery,
} from '../services/CountryServices';
import {Country} from '../services/CountryModel';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import CountryItem from '../components/CountryItem';
import {
  addFavorite,
  removeFavorite,
  updateCacheToOriginalList,
  invokePullToRefresh,
  setSearchCacheData,
} from '../store/CountrySlice';
import {SearchIcon, HeartIcon} from '../components/SvgIcons';
import Container from '../components/Container';
import {useTheme} from '../hooks/useTheme';
import {isErrorWithMessage} from '../services/Api';

const HomeScreen: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const {theme, colors} = useTheme();
  const dispatch = useDispatch();
  const {allCountryList, favoriteList, isPullToRefreshLoading} = useSelector(
    (state: RootState) => state.country,
  );
  const [getAllCountry, {error: countryError, isLoading: isCountryLoading}] =
    useLazyGetCountryQuery();
  const [
    searchCountry,
    {
      error: searchCountryError,
      isFetching: isSearchCountryLoading,
      isSuccess,
      isError,
      data: searchCountryData,
    },
  ] = useLazySearchCountryQuery();

  useEffect(() => {
    getAllCountry();
  }, []);

  useEffect(() => {
    if (isSuccess && searchCountryData) {
      dispatch(setSearchCacheData(searchCountryData));
    } else if (isError) {
      dispatch(setSearchCacheData([]));
    }
  }, [isSuccess, isError, searchCountryData]);

  /**
   * @function onPressFavItem
   * @param {object, string} -country and name
   * add/remove favorite country in redux store
   */
  const onPressFavItem = useCallback(
    (country: Country, name: string) => {
      if (favoriteList.some(favorite => favorite.name === country.name)) {
        dispatch(removeFavorite({country, name}));
      } else {
        dispatch(addFavorite({country, name}));
      }
    },
    [allCountryList],
  );

  /**
   * @function handleSearchTextChange
   * @param {string} - update the search value
   * update the search / all country list in redux store
   */
  const handleSearchTextChange = (searchText: string) => {
    setSearchValue(searchText);
    if (searchText === '') {
      dispatch(updateCacheToOriginalList());
    }
  };

  /**
   * @function handleRefresh
   * refresh the country list
   */
  const handleRefresh = () => {
    dispatch(invokePullToRefresh());
    getAllCountry();
  };

  /**
   * @function invokeSearchCountry
   * invoke search country api
   */
  const invokeSearchCountry = () => {
    Keyboard.dismiss();
    if (searchValue !== '') {
      searchCountry(searchValue, true);
    }
  };

  /**
   * @function countryItem
   * @param {object} item - countryList
   * render Flat list item
   */
  const countryItem = (item: Country) => {
    return <CountryItem country={item} onPressFavItem={onPressFavItem} />;
  };

  /**
   * @function loadingComponent
   * render loading in api call
   */
  const loadingComponent = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.border} size={'large'} />
      </View>
    );
  };

  /**
   * @function errorComponent
   * render error message  api call fails
   */
  const errorComponent = () => {
    return (
      <View style={styles.errorContainer}>
        {isErrorWithMessage(countryError) ? (
          <Text style={[styles.errorText, {color: colors.text}]}>
            {countryError?.data?.message}
          </Text>
        ) : isErrorWithMessage(searchCountryError) ? (
          <Text style={[styles.errorText, {color: colors.text}]}>
            {searchCountryError?.data?.message}
          </Text>
        ) : (
          <Text style={[styles.errorText, {color: colors.text}]}>
            Not Found
          </Text>
        )}
      </View>
    );
  };

  return (
    <Container
      backgroundColor={colors.background}
      barStyle={theme === 'light' ? 'dark-content' : 'light-content'}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: colors.text}]}>
            Country Explorer
          </Text>
          <Pressable
            style={{alignSelf: 'center'}}
            onPress={() => {
              navigate('favorite');
            }}>
            {HeartIcon(true, colors.border)}
          </Pressable>
        </View>
        <View style={[styles.inputContainer, {borderColor: colors.border}]}>
          <TextInput
            placeholder="Search Country"
            placeholderTextColor={colors.text}
            value={searchValue}
            onChangeText={handleSearchTextChange}
            style={[styles.input, {color: colors.text}]}
            returnKeyType="search"
            onSubmitEditing={invokeSearchCountry}
          />
          <Pressable onPress={invokeSearchCountry} style={styles.icons}>
            {SearchIcon(colors.border)}
          </Pressable>
        </View>

        {isCountryLoading || isSearchCountryLoading ? (
          loadingComponent()
        ) : allCountryList && allCountryList.length ? (
          <FlatList
            data={allCountryList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.name}
            renderItem={({item}) => countryItem(item)}
            windowSize={10}
            initialNumToRender={6}
            removeClippedSubviews={true}
            refreshControl={
              <RefreshControl
                refreshing={isPullToRefreshLoading}
                onRefresh={handleRefresh}
              />
            }
          />
        ) : (
          errorComponent()
        )}
      </View>
    </Container>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  title: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    margin: 20,
    paddingHorizontal: 8,
  },
  input: {
    height: 50,
    flex: 1,
  },
  icons: {
    alignSelf: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
