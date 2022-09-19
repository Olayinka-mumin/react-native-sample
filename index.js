import React from 'react';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from '@config/store';
import App from './App';

// registerRootComponent calls
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const Wrap = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('expobaretypescript', () => Wrap);

registerRootComponent(Wrap);
