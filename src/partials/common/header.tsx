import React, { useState } from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';
import { verticalScale } from 'react-native-size-matters';
import { StatusBar, Platform, useColorScheme } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Helper from '@config/helper';

const statusBar = Constants.statusBarHeight;
interface Props {
  onPressOption?: (index: number) => void;
  containerStyle?: object;
  left?: JSX.Element;
  right?: JSX.Element;
  back?: () => void;
  title: string;
  optionTxtStyle?: object;
  options?: string[];
}

export default (props: Props) => {
  const scheme = useColorScheme();
  const [visible, setVisible] = useState(false);

  const menuSelect = (index: number) => {
    setVisible(false);
    props.onPressOption?.(index);
  };

  return (
    <Outer>
      <Wrap
        style={props.containerStyle ? props.containerStyle : {}}
        background={Helper.getColor().plane}
        scheme={scheme}
      >
        <StatusBar barStyle={scheme === 'light' ? 'dark-content' : 'light-content'} />
        {Platform.OS === 'android' ? null : <StatusWrap />}
        <Head>
          <LeftBox>
            {props.left ? (
              props.left
            ) : props.back ? (
              <LeftBtn onPress={props.back && props.back}>
                <BackIcon name={'keyboard-backspace'} />
              </LeftBtn>
            ) : null}
          </LeftBox>
          <CenterTitle>{props.title && props.title}</CenterTitle>
          <RightBox>
            {props.right
              ? props.right
              : props.options
              ? props.options.length && (
                  <RightTouch onPress={() => setVisible(true)}>
                    <Dot name={'dots-three-vertical'} color={Helper.getColor().primaryTxt} />
                  </RightTouch>
                )
              : null}
          </RightBox>
        </Head>
      </Wrap>
      <Modal
        visible={visible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => console.log()}
      >
        <Inner activeOpacity={1} onPress={() => setVisible(false)}>
          <MenuWrap>
            <List
              data={props.options ? props.options : []}
              keyExtractor={(_item: any, index: number) => index.toString()}
              renderItem={({ item, index }: any) => (
                <EachMenu onPress={() => menuSelect(index)}>
                  <MenuTxt
                    style={props.optionTxtStyle ? props.optionTxtStyle : {}}
                    color={scheme === 'dark' ? '#fff' : '#184859'}
                  >
                    {item}
                  </MenuTxt>
                </EachMenu>
              )}
            />
          </MenuWrap>
        </Inner>
      </Modal>
    </Outer>
  );
};

const Outer = styled.View``;
const Wrap = styled.View`
  background-color: ${(props: any) => props.background};
  border-bottom-color: ${(props: any) =>
    props.scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'};
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
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
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
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primaryTxt)};
  font-family: Regular;
`;
const List = styled.FlatList``;
const Icon = styled.Text``;
const CenterTitle = styled.Text`
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primaryTxt)};
  font-family: Medium;
  font-size: 20px;
  text-align: center;
`;
const Dot = styled(Entypo)`
  color: ${(prop: any) => prop.color};
  font-size: 15px;
  margin-top: 4px;
`;
const BackIcon = styled(MaterialCommunityIcons)`
  color: ${(prop: any) => (prop.color ? prop.color : Helper.getColor().primaryTxt)};
  font-size: 22px;
  margin-top: 4px;
`;
