import React from 'react';
import { Props as InputProps } from '@shared/form/Input';
import InputError from '@shared/form/InputError';
import Label from '@shared/form/Label';
import Styles from './styles';

const txtVertical = { textAlignVertical: 'top' };

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
}: InputProps) => (
  <Styles.Wrap>
    {label && <Label label={label} isOptional={isOptional} />}
    <Styles.Input
      multiline
      value={value}
      style={txtVertical}
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
