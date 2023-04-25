/*************************************************
 * Country Explorer
 * @exports
 * ApplicationNavigator.tsx
 * Created by Ramesh on 25/04/2023
 *************************************************/

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen, FavoriteScreen} from '../screens';
import {navigationRef} from './NavigationUtils';

export type RootStackParamList = {
  home: undefined;
  favorite: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="home" component={HomeScreen} />
        <RootStack.Screen name="favorite" component={FavoriteScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
