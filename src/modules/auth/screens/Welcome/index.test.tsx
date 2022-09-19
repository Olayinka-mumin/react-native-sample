import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import Welcome from './index';

test('Test Welcome Component', () => {
  render(
    <TestReduxProvider>
      <Welcome />
    </TestReduxProvider>,
  );
});
