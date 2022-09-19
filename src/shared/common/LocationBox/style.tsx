import { AntDesign, Entypo } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components';
import { getColor } from '@config/helpers';

const Wrap = styled.View``;
const ListWrap = styled.View`
  padding: 0 25px;
`;
const ListBox = styled(Animated.View)`
  width: 100%;
  height: ${verticalScale(180)}px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 15px;
  padding-left: 10px;
  background-color: ${({ background }: { background: string }) => (
    background || getColor().plane
  )};
  margin-top: -5px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const List = styled.FlatList``;
const AddressBox = styled.View`
  border-radius: 10px;
  background-color: ${({ background }: { background: string }) => (
    background || getColor().plane
  )};
  flex-direction: row;
  align-items: center;
  padding: 0 ${verticalScale(10)}px;
  height: ${verticalScale(45)}px;
  z-index: 100;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const IconTouch = styled.TouchableOpacity`
  margin-right: ${verticalScale(8)}px;
`;
const SearchIcon = styled(AntDesign)`
  color: ${({ color }: { color: string }) => (
    color || getColor().secondaryText
  )};
  font-size: ${moderateScale(20)}px;
`;
const Input = styled.TextInput`
  width: 90%;
  color: ${({ color }: { color: string }) => (
    color || getColor().primaryText
  )};
  font-family: Regular;
  font-size: ${moderateScale(12)}px;
`;
const AddressWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${verticalScale(5)}px 0;
`;
const Bullets = styled(Entypo)`
  font-size: ${moderateScale(25)}px;
  width: 10%;
`;
const BulletTxt = styled.Text`
  font-family: Regular;
  font-size: ${moderateScale(13)}px;
  color: ${({ color }: { color: string }) => (
    color || getColor().plane
  )};
  opacity: 0.4;
  width: 90%;
`;

export default {
  Wrap,
  ListWrap,
  ListBox,
  List,
  AddressBox,
  IconTouch,
  SearchIcon,
  Input,
  AddressWrap,
  Bullets,
  BulletTxt,
};
