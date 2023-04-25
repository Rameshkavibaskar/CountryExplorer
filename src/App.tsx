/*************************************************
 * Country Explorer
 * @exports
 * App.tsx
 * Created by Ramesh on 25/04/2023
 *************************************************/

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import ApplicationNavigator from './navigators/ApplicationNavigator';

const App = () => (
  <Provider store={store}>
    <ApplicationNavigator />
  </Provider>
);

export default App;
