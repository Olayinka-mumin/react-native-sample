import styled from 'styled-components/native';
import { getColor } from '@config/helpers';

const ErrorText = styled.Text`
  font-family: Regular;
  font-size: 12px;
  margin-top: 5px;
  color: ${getColor().errorRed};
`;

export default {
  ErrorText,
};
