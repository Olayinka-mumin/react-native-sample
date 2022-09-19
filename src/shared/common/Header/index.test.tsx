import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import Header from './index';

test('Test Header Component', () => {
  render(
    <TestReduxProvider>
      <Header title="Test" />
    </TestReduxProvider>,
  );
});
