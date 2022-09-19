import styled from 'styled-components/native';
import { getColor } from '@config/helpers';

const Wrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;
const Label = styled.Text`
  font-size: 14px;
  font-family: Regular;
  color: ${({ color }: { color: string }) => (
    color || getColor().primaryText
  )};
`;
const Optional = styled.Text`
  font-size: 14px;
  font-family: Light;
  color: ${({ color }: { color: string }) => (
    color || getColor().primaryText
  )};
`;

export default {
  Wrap,
  Label,
  Optional,
};
