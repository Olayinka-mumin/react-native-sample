import React from 'react';
import { render } from '@testing-library/react-native';
import Button from './index';

it('render button components (Loading State)', () => {
  let value = false;
  const { getAllByTestId } = render(
    <Button
      onPress={() => {
        value = false;
      }}
      title="Hi"
      isLoading
    />,
  );
  expect(getAllByTestId('BtnActivityIndicator').length).toBe(1);
  expect(value).toBe(false);
});
