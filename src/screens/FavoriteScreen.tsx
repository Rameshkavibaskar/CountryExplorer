/* eslint-disable react-hooks/exhaustive-deps */
/*************************************************
 * Country Explorer
 * @exports
 * FavoriteScreen.tsx
 * Created by Ramesh on 25/04/2023
 *************************************************/

import React, {FC, useCallback} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Switch,
  Platform,
} from 'react-native';
import CountryItem from '../components/CountryItem';
import {useDispatch, useSelector} from 'react-redux';
import {Country} from '../services/CountryModel';
import {RootState} from '../store';
import {removeFavorite} from '../store/CountrySlice';
import {goBack} from '../navigators/NavigationUtils';
import {BackIcon} from '../components/SvgIcons';
import Container from '../components/Container';
import {useTheme} from '../hooks/useTheme';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const FavoriteScreen: FC = () => {
  const dispatch = useDispatch();
  const {theme, colors, toggleTheme} = useTheme();
  const {favoriteList} = useSelector((state: RootState) => state.country);

  /**
   * @function removeFavItem
   * @param {object, string} -country and name
   * remove favorite country in redux store
   */
  const removeFavItem = useCallback((country: Country, name: string) => {
    dispatch(removeFavorite({country, name}));
  }, []);

  /**
   * @function countryItem
   * @param {object} item - countryList
   * render Flat list item
   */
  const countryItem = (item: Country) => {
    return (
      <CountryItem
        country={item}
        onPressFavItem={(country: Country, name: string) => {
          removeFavItem(country, name);
        }}
      />
    );
  };

  return (
    <Container
      backgroundColor={colors.background}
      barStyle={theme === 'light' ? 'dark-content' : 'light-content'}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.header}>
          <Pressable
            style={styles.backIcon}
            onPress={() => {
              goBack();
            }}>
            {BackIcon(colors.border)}
          </Pressable>
          <Text style={[styles.title, {color: colors.text}]}>
            Favorite Country
          </Text>
        </View>
        <View style={styles.modeContainer}>
          <Text style={[styles.title, {color: colors.text}]}> Dark Mode </Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
        {favoriteList && favoriteList.length ? (
          <FlatList
            data={favoriteList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.name}
            renderItem={({item}) => countryItem(item)}
            windowSize={10}
            initialNumToRender={6}
            removeClippedSubviews={true}
          />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, {color: colors.text}]}>
              No data found
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};
export default FavoriteScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 12,
  },
  title: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  backIcon: {
    alignSelf: 'center',
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
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingRight: 8,
  },
});
