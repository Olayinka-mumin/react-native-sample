import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useAppDispatch } from '@config/store';
import { queryOne } from '@modules/auth/store/action';

export default () => {
  const dispatch = useAppDispatch();
  const [val, setVal] = useState('');

  const tap = () => {
    Alert.alert(`You typed ${val}`);
    dispatch(queryOne());
  };

  return (
    <Wrap>
      <Input value={val} onChangeText={(val: string) => setVal(val)} testID={'textField'} />
      <Btn onPress={tap} testID={'tapBtn'}>
        <Txt accessibilityLabel={'Text'}>Tap Me</Txt>
      </Btn>
    </Wrap>
  );
};

const Wrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 3px;
  background-color: antiquewhite;
  align-items: center;
  justify-content: center;
`;
const Txt = styled.Text``;
const Input = styled.TextInput`
  width: 100px;
  height: 40px;
  border-radius: 3px;
  background-color: aliceblue;
`;
