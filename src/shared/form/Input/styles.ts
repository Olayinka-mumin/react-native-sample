import styled from 'styled-components/native';
import { getColor } from '@config/helpers';

const Wrap = styled.View``;
const Input = styled.TextInput`
  border-width: 0.2px;
  border-color: ${getColor().borderColor};
  border-radius: 4px;
  height: 50px;
  padding: 0 14px;
  background-color: ${getColor().plane};
  font-family: Regular;
  color: ${getColor().primaryText};
  font-size: 15px;
`;

export default {
  Wrap,
  Input,
};
