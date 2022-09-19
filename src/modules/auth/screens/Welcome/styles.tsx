import styled from 'styled-components/native';

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

export default {
  Input,
  Txt,
  Wrap,
  Btn,
};
