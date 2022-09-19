import styled from 'styled-components/native';
import { getColor } from '@config/helpers';

const Wrap = styled.View`
  min-height: 130px;
`;
const Input = styled.TextInput`
  border-width: 0.2px;
  border-color: ${getColor().borderColor};
  border-radius: 4px;
  height: 50px;
  background-color: ${getColor().plane};
  font-family: Regular;
  color: ${getColor().primaryText};
  font-size: 15px;
  min-height: 100px;
  padding: 10px 14px;
  line-height: 23px;
`;

export default {
  Wrap,
  Input,
};
