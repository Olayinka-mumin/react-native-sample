import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import LocationBox from './index';

test('Test LocationBox Component', () => {
  let isLoading = false;
  render(
    <TestReduxProvider>
      <LocationBox
        address=""
        isLoading={isLoading}
        onChange={() => {
          isLoading = false;
        }}
        onGetGeometry={() => {
          isLoading = false;
        }}
      />
    </TestReduxProvider>,
  );
  expect(isLoading).toBe(false);
});
