import React from 'react';
import Styles from './styles';

export interface Props {
  error?: string;
}

export default ({
  error,
}: Props) => (
  <Styles.ErrorText>
    {error}
  </Styles.ErrorText>
);
