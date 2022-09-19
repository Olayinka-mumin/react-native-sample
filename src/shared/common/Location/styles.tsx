import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { getColor } from '@config/helpers';

const Modal = styled.Modal`
  flex: 1;
`;
const Wrap = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: space-between;
  padding: ${verticalScale(5)}px ${verticalScale(15)}px 
  ${verticalScale(20)}px ${verticalScale(15)}px;
`;
const Map = styled(MapView)`
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
const Footer = styled.View``;
const AddressWrap = styled.View`
  margin-top: ${Constants.statusBarHeight}px;
`;
const BackTouch = styled.TouchableOpacity`
  margin-bottom: 10px;
`;
const BackIcon = styled(FontAwesome)`
  color: ${({ color }: { color: string }) => (color || getColor().primary)};
  font-size: ${moderateScale(18)}px;
`;
const SatelliteBox = styled.View`
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: ${verticalScale(20)}px;
`;
const IconTouch = styled.TouchableOpacity`
  height: ${verticalScale(32)}px;
  width: ${verticalScale(32)}px;
  border-radius: ${verticalScale(32) / 2}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ background }: { background: string }) => (
    background || getColor().plane
  )};
  margin-bottom: ${({ hasMarginBottom }: { hasMarginBottom: boolean }) => (
    hasMarginBottom ? verticalScale(10) : '0'
  )}px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const GlobeIcon = styled(Ionicons)`
  color: ${({ color }: { color: string }) => (color || getColor().primary)};
  font-size: ${moderateScale(20)}px;
  margin-top: 1px;
  margin-left: 1px;
`;
const LocateIcon = styled(MaterialIcons)`
  color: ${({ color }: { color: string }) => (color || getColor().primary)};
  font-size: ${moderateScale(20)}px;
`;

export default {
  Modal,
  Wrap,
  Map,
  Footer,
  AddressWrap,
  BackTouch,
  BackIcon,
  SatelliteBox,
  IconTouch,
  GlobeIcon,
  LocateIcon,
};
