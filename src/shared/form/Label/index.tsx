import React from 'react';
import i18n from 'i18n-js';
import Styles from './styles';

export interface Props {
  label?: string;
  isOptional?: boolean;
}

export default ({
  label,
  isOptional,
}: Props) => (
  <Styles.Wrap>
    <Styles.Label>{label}</Styles.Label>
    {isOptional && <Styles.Optional>{i18n.t('optional')}</Styles.Optional>}
  </Styles.Wrap>
);
