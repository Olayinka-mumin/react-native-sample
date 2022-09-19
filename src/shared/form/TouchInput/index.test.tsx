import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import TouchInput from './index';

test('Test TouchInput Component', () => {
  let value = false;
  render(
    <TestReduxProvider>
      <TouchInput
        value=""
        onPress={() => {
          value = true;
        }}
      />
    </TestReduxProvider>,
  );
  expect(value).toBe(false);
});
