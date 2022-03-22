import { render } from '@testing-library/react-native';
import React from 'react';
import Button from '@form/button';
import Input from '@form/input';

it('render button component', () => {
  const { getByText } = render(<Button press={() => {}} title={'Hello'} />);
  getByText('Hello');
});

it('render button component (Loading State)', () => {
  const { getAllByTestId } = render(<Button press={() => {}} title={'Hi'} loading={true} />);
  expect(getAllByTestId('BtnActivityIndicator').length).toBe(1);
});

it('render input field', () => {
  render(<Input value={''} change={() => {}} />);
});
