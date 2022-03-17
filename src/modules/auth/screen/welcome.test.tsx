import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Welcome from './welcome';
import store from '@config/store';

export const ReduxProvider = ({ children, reduxStore }: any) => (
  <Provider store={store}>{children}</Provider>
);

it('renders', () => {
  render(
    <ReduxProvider>
      <Welcome />
    </ReduxProvider>
  );
});
