import React from 'react';
import { render } from '@testing-library/react-native';
import { TestReduxProvider } from '@config/store';
import Label from './index';

test('Test Label Component', () => {
  render(
    <TestReduxProvider>
      <Label label="Test" />
    </TestReduxProvider>,
  );
});
