import React from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';
import Helper from '@config/helper';

interface Props {
  label?: string;
  value: string;
  editable?: boolean;
  secure?: boolean;
  keyboardType?: string;
  placeholder?: string;
  autoCapitalize?: string;
  length?: number;
  autoComplete?: string;
  plane?: boolean;
  change: (value: '' | undefined | string) => void;
  name?: string;
  focus?: boolean;
}
export default (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Wrap>
      <Label scheme={scheme}>{props.label && props.label}</Label>
      <Input
        value={props.value}
        editable={props.editable}
        placeholderColor={'#8A8A8A'}
        secureTextEntry={props.secure}
        autoFocus={props.focus}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        underlineColorAndroid={'transparent'}
        autoCapitalize={props.autoCapitalize}
        maxLength={props.length && props.length}
        autoCompleteType={props.autoComplete && props.autoComplete}
        onChangeText={
          props.plane
            ? (value: string) => props.change(value)
            : props.change(props.name && props.name)
        }
      />
    </Wrap>
  );
};

const txtVertical = { textAlignVertical: 'top' };

export const TextArea = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Wrap2>
      <Label scheme={scheme}>{props.label && props.label}</Label>
      <Area
        multiline={true}
        value={props.value}
        autoFocus={props.focus}
        editable={props.editable}
        placeholderColor={'#8A8A8A'}
        secureTextEntry={props.secure}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        style={txtVertical}
        underlineColorAndroid={'transparent'}
        autoCapitalize={props.autoCapitalize}
        maxLength={props.length && props.length}
        autoCompleteType={props.autoComplete && props.autoComplete}
        onChangeText={
          props.plane
            ? (value: string) => props.change(value)
            : props.change(props.name && props.name)
        }
      />
    </Wrap2>
  );
};

interface TouchInputInterface {
  label: string;
  value: string;
  press: () => void;
}
export const TouchInput = (props: TouchInputInterface) => {
  const scheme = useColorScheme();
  return (
    <Wrap>
      <Label scheme={scheme}>{props.label}</Label>
      <TouchBox onPress={props.press}>
        <TouchTxt>{props.value}</TouchTxt>
      </TouchBox>
    </Wrap>
  );
};

interface ErrorInterface {
  error: string;
}
export const ErrorTxt = (props: ErrorInterface) => <ErrTxt>{props.error}</ErrTxt>;

const Wrap = styled.View``;
const Label = styled.Text`
  font-size: 14px;
  font-family: Regular;
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primaryTxt)};
  margin-bottom: 10px;
`;
const Input = styled.TextInput`
  border-width: 0.2px;
  border-color: ${(props: any) =>
    props.scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'};
  border-radius: 4px;
  height: 50px;
  padding: 0 14px;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  font-family: Regular;
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primaryTxt)};
  font-size: 15px;
`;
const TouchBox = styled.TouchableOpacity`
  border-width: 0.2px;
  border-color: ${(props: any) =>
    props.scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'};
  border-radius: 4px;
  height: 50px;
  padding: 0 14px;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  justify-content: center;
`;
const TouchTxt = styled.Text`
  font-family: Regular;
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primaryTxt)};
  font-size: 15px;
`;
const ErrTxt = styled.Text`
  font-family: Regular;
  font-size: 12px;
  margin-top: 5px;
  color: #ff4f58;
`;
const Area = styled(Input)`
  min-height: 100px;
  padding: 10px 14px;
  line-height: 23px;
`;
const Wrap2 = styled.View`
  min-height: 130px;
`;
