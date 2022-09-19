import * as Font from 'expo-font';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { colors } from '@config/constants';
import { getColor } from '@config/helpers';

const ButtonWrap = styled.TouchableOpacity`
  width: 100%;
  height: ${`${verticalScale(50)}px`};
  background-color: ${getColor().primary};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ isDisabled }: { isDisabled: boolean }) => (isDisabled ? '0.4' : '1')};
`;

const ButtonText = styled.Text`
  font-family: ${Font.isLoaded('Medium') ? 'Medium' : 'Medium'};
  font-size: ${`${moderateScale(16)}px`};
  color: ${colors.plane};
  letter-spacing: 1px;
`;

export default {
  ButtonWrap,
  ButtonText,
};
