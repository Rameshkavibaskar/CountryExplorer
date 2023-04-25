/*************************************************
 * Country Explorer
 * @exports
 * Container.tsx
 * Created by Ramesh on 25/04/2023
 *************************************************/

import React, {Fragment, FC} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
} from 'react-native';

interface Params {
  backgroundColor: string;
  barStyle: StatusBarStyle;
  children: React.ReactNode;
  bottomBg?: string;
}

const Container: FC<Params> = ({backgroundColor, barStyle, children}) => {
  return (
    <Fragment>
      <SafeAreaView
        style={[styles.container, {backgroundColor: backgroundColor}]}>
        <View style={[{backgroundColor}]}>
          <SafeAreaView>
            <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
          </SafeAreaView>
        </View>
        {children}
      </SafeAreaView>
    </Fragment>
  );
};

export default Container;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
