import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import TextArea from './index';

test('Test TextArea Component', () => {
  let value = '';
  render(
    <TestReduxProvider>
      <TextArea
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
