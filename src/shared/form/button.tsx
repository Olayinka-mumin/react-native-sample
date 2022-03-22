import React from 'react';
import * as Font from 'expo-font';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import Helper from '@config/helper';

interface Props {
  background?: string;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  press: () => void;
  color?: string;
  title: string;
}

export default (props: Props) => (
  <Wrap
    background={props.background}
    shadow={props.shadow}
    onPress={props.loading || props.disabled ? null : props.press}
    disabled={props.disabled}
  >
    {props.loading ? (
      <ActivityIndicator
        size={'small'}
        color={props.color ? props.color : '#fff'}
        testID={'BtnActivityIndicator'}
      />
    ) : (
      <Txt color={props.color && props.color}>{props.title}</Txt>
    )}
  </Wrap>
);

const Wrap = styled.TouchableOpacity`
  width: 100%;
  height: ${verticalScale(50) + 'px'};
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().primary};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${(props: any) => (props.disabled ? '0.4' : '1')};
  shadow-opacity: ${(props: any) => (props.shadow ? '1.0' : '0')};
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: ${(props: any) => (props.shadow ? '5px' : '0px')}
    ${(props: any) => (props.shadow ? '5px' : '0px')};
`;

const Txt = styled.Text`
  font-family: ${Font.isLoaded('Medium') ? 'Medium' : 'Medium'};
  font-size: ${moderateScale(16) + 'px'};
  color: ${(props: any) => (props.color ? props.color : '#fff')};
  letter-spacing: 1px;
`;
