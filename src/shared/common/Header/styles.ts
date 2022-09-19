import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { getColor } from '@config/helpers';

const statusBar = Constants.statusBarHeight;

const Wrap = styled.View`
  background-color: ${({ background }: { background: string }) => (
    background || getColor().plane
  )};
  border-bottom-color: ${({ scheme }: { scheme: 'dark' | 'light' }) => (
    scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'
  )};
  border-bottom-width: 0.2px;
  width: 100%;
`;
const StatusWrap = styled.View`
  height: ${statusBar - 10}px;
  width: 100%;
`;
const Head = styled.View`
  height: ${statusBar > 40
    ? verticalScale(40)
    : verticalScale(Platform.OS === 'android' ? 55 : 45)}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LeftBox = styled.View`
  height: 100%;
  min-width: 25%;
`;
const RightBox = styled.View`
  height: 100%;
  min-width: 25%;
`;
const LeftBtn = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  padding-left: 20px;
`;
const RightTouch = styled.TouchableOpacity`
  padding-right: 18px;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;
const Modal = styled.Modal`
  flex: 1;
`;
const Inner = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.17);
  align-items: flex-end;
  padding: 50px 14px;
`;
const MenuWrap = styled.View`
  border-radius: 10px;
  background-color: ${({ background }: { background: string }) => (
    background || getColor().plane
  )};
  width: 153px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.25);
  shadow-offset: 2px 2px;
`;
const EachMenu = styled.TouchableOpacity`
  height: 47px;
  width: 100%;
  padding: 0 17px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const MenuTxt = styled.Text`
  width: 100%;
  font-size: 14px;
  color: ${({ color }: { color: string }) => (
    color || getColor().primaryText
  )};
  font-family: Regular;
`;
const List = styled.FlatList``;
const CenterTitle = styled.Text`
  color: ${({ color }: { color: string }) => (
    color || getColor().primaryText
  )};
  font-family: Medium;
  font-size: 20px;
  text-align: center;
`;
const Dot = styled(Entypo)`
  color: ${({ color }: { color: string }) => (
    color || getColor().primaryText
  )};
  font-size: 15px;
  margin-top: 4px;
`;
const BackIcon = styled(MaterialCommunityIcons)`
  color: ${({ color }: { color: string }) => (
    color || getColor().primaryText
  )};
  font-size: 22px;
  margin-top: 4px;
`;

export default {
  Wrap,
  StatusWrap,
  Head,
  LeftBox,
  RightBox,
  LeftBtn,
  RightTouch,
  Modal,
  Inner,
  MenuWrap,
  EachMenu,
  MenuTxt,
  List,
  CenterTitle,
  Dot,
  BackIcon,
};
