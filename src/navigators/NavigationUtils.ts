/*************************************************
 * Country Explorer
 * @exports
 * NavigationUtils.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/

import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: any) => {
  navigationRef?.navigate(name, params);
};

export const replace = (name: string, params?: any) => {
  navigationRef?.dispatch(StackActions.replace(name, params));
};

export const goBack = () => {
  navigationRef?.goBack();
};
