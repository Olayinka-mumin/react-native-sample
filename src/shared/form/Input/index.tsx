import React from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { IAutoCompleteType } from '@config/models';
import InputError, { Props as InputErrorProps } from '@shared/form/InputError';
import Label, { Props as LabelProps } from '@shared/form/Label';
import Styles from './styles';

export interface Props extends LabelProps, InputErrorProps {
  label?: string;
  value: string;
  isEditable?: boolean;
  isSecure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  autoCompleteType?: IAutoCompleteType;
  isFormik?: boolean;
  onChange: (value: string) => void;
  name: string;
  autoFocus?: boolean;
}

export default ({
  label,
  value,
  isEditable,
  isSecure,
  keyboardType,
  placeholder,
  autoCapitalize,
  maxLength,
  autoCompleteType,
  isFormik,
  onChange,
  name,
  autoFocus,
  isOptional,
  error,
}: Props) => (
  <Styles.Wrap>
    {label && <Label label={label} isOptional={isOptional} />}
    <Styles.Input
      value={value}
      editable={isEditable}
      placeholderColor="#8A8A8A"
      secureTextEntry={isSecure}
      autoFocus={autoFocus}
      placeholder={placeholder}
      keyboardType={keyboardType}
      underlineColorAndroid="transparent"
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      autoCompleteType={autoCompleteType}
      onChangeText={
        isFormik
          ? (val: string) => onChange(val)
          : onChange(name)
      }
    />
    {error && <InputError error={error} />}
  </Styles.Wrap>
);
