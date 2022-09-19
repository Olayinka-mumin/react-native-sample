import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import InputError from './index';

test('Test InputError Component', () => {
  render(
    <TestReduxProvider>
      <InputError error="Test" />
    </TestReduxProvider>,
  );
});
