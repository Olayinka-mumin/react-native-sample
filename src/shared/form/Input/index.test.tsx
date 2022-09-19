import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import Input from './index';

test('Test Input Component', () => {
  let value = '';
  render(
    <TestReduxProvider>
      <Input
        name="test"
        value={value}
        onChange={(val: string) => {
          value = val;
        }}
      />
    </TestReduxProvider>,
  );
  expect(value).toBe('');
});
