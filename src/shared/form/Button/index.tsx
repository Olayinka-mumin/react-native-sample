import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '@config/constants';
import Styles from './styles';

interface Props {
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  title: string;
}

export default ({
  title,
  onPress,
  isDisabled,
  isLoading,
}: Props) => (
  <Styles.ButtonWrap
    onPress={onPress}
    disabled={isDisabled}
  >
    {isLoading ? (
      <ActivityIndicator
        size="small"
        color={colors.plane}
        testID="BtnActivityIndicator"
      />
    ) : (
      <Styles.ButtonText>
        {title}
      </Styles.ButtonText>
    )}
  </Styles.ButtonWrap>
);
