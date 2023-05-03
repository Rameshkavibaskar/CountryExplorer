/*************************************************
 * Country Explorer
 * @exports
 * CountryItem.tsx
 * Created by Ramesh on 25/04/2023
 *************************************************/

import React, {FC, useState, memo} from 'react';
import {Country} from '../services/CountryModel';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {HeartIcon} from './SvgIcons';
import {useTheme} from '../hooks/useTheme';

interface Params {
  country: Country;
  onPressFavItem: (country: Country, name: string) => void;
}

const CountryItem: FC<Params> = ({country, onPressFavItem}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {colors} = useTheme();
  const areaSquareMiles = Math.round(country.area * 0.386102);

  /**
   * @function handleImageLoad
   * render loading before image update
   */
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, {borderColor: colors.border}]}>
      <View style={styles.imageContainer}>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.border} />
          </View>
        )}
        <SvgUri
          width="100%"
          height="100"
          uri={country.flag}
          preserveAspectRatio="xMidYMid slice"
          onLoad={handleImageLoad}
        />
      </View>

      <Pressable
        style={styles.favoriteImage}
        onPress={() => {
          onPressFavItem(country, country.name);
        }}>
        {HeartIcon(country.isFavorite, colors.border)}
      </Pressable>
      <View style={styles.rowContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Country Name </Text>
        <Text style={[styles.value, {color: colors.text}]}>{country.name}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Capital </Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {country.capital[0]}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Population </Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {country.population}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Area </Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {`${country.area} km² / ${areaSquareMiles} mi²`}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Languages </Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {country.languages.join(', ')}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Time Zone </Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {country.timezones.join(', ')}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={[styles.label, {color: colors.text}]}>Currencies </Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {`${country.currencies[0].symbol} , ${country.currencies[0].name}`}
        </Text>
      </View>
    </View>
  );
};

export default memo(CountryItem);

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 1,
    padding: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  favoriteImage: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 14,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 100,
    width: '100%',
  },
});
