import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import Location from './index';

test('Test Location Component', () => {
  let isVisible = false;
  render(
    <TestReduxProvider>
      <Location
        isVisible={isVisible}
        apiKey=""
        onClose={() => {
          isVisible = false;
        }}
        onError={() => {
          isVisible = false;
        }}
        onDone={() => {
          isVisible = false;
        }}
      />
    </TestReduxProvider>,
  );
  expect(isVisible).toBe(false);
});
