import React from 'react';
import InputError, { Props as InputErrorProps } from '@shared/form/InputError';
import Label, { Props as LabelProps } from '@shared/form/Label';
import Styles from './styles';

interface Props extends LabelProps, InputErrorProps {
  value: string;
  onPress: () => void;
}

export default ({
  value,
  error,
  label,
  isOptional,
  onPress,
}: Props) => (
  <Styles.Wrap>
    {label && <Label label={label} isOptional={isOptional} />}
    <Styles.TouchBox onPress={onPress}>
      <Styles.TouchText>
        {value}
      </Styles.TouchText>
    </Styles.TouchBox>
    {error && <InputError error={error} />}
  </Styles.Wrap>
);
