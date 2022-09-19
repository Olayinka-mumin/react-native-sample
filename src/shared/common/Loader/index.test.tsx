import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import Loader from './index';

test('Test Loader Component', () => {
  render(
    <TestReduxProvider>
      <Loader />
    </TestReduxProvider>,
  );
});
