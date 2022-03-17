import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { ActivityIndicator, Appearance, StyleSheet, Animated, Keyboard } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import Helper from '@config/helper';

const EachAddress = (props: { press: any; title: any }) => (
  <AddressWrap onPress={props.press}>
    <Bullets name={'dot-single'} />
    <BulletTxt color={Helper.getColor().primaryTxt} numberOfLines={1} ellipsizeMode={'tail'}>
      {props.title}
    </BulletTxt>
  </AddressWrap>
);

interface MyComponentProps {
  change: (query: string) => void;
  geometry: (location: any) => void;
  suggestions?: any[];
  address: string;
  loading: boolean;
}

class LocationBox extends React.Component<MyComponentProps> {
  state = {
    visible: false,
    icon: 'search1',
    y: new Animated.Value(-50),
    scheme: Appearance.getColorScheme(),
  };

  slide = (visible: any) => {
    Animated.spring(this.state.y, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    this.setState({ visible });
  };

  change = (query: string) => {
    if (query !== '') this.slide(true);
    this.props.change(query);
  };

  select = (location: any) => {
    this.props.geometry(location.place_id);
    this.slide(false);
  };

  keyExtractor = (item: any, index: number) => index.toString();
  renderItem = ({ item }: any) => (
    <EachAddress title={item.description} press={() => this.select(item)} />
  );

  render() {
    const { suggestions, address, loading } = this.props;
    return (
      <Wrap>
        <AddressBox style={others.shadow} background={Helper.getColor().plane}>
          <IconTouch
            onPress={() => {
              !loading && Keyboard.dismiss();
              !loading && this.slide(false);
            }}
          >
            {loading ? (
              <ActivityIndicator color={Helper.getColor().secondaryTxt} />
            ) : (
              <SearchIcon name={this.state.icon} color={Helper.getColor().secondaryTxt} />
            )}
          </IconTouch>
          <Input
            value={address}
            onChangeText={this.change}
            placeholder={'Type Location'}
            color={Helper.getColor().primaryTxt}
            underlineColorAndroid={'transparent'}
            onFocus={() => this.setState({ icon: 'close' })}
            onBlur={() => this.setState({ icon: 'search1' })}
          />
        </AddressBox>
        {this.state.visible && (
          <ListWrap>
            <ListBox
              style={[others.shadow, { transform: [{ translateY: this.state.y }] }]}
              background={Helper.getColor().plane}
            >
              <List
                data={suggestions}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
              />
            </ListBox>
          </ListWrap>
        )}
      </Wrap>
    );
  }
}

const others = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: 'rgba(0,0,0,0.08)',
  },
});

const mapStateToProps = (_state: any) => {
  return {};
};

const mapDispatchToProps = (_dispatch: any) => {
  return {};
};

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
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  margin-top: -5px;
`;
const List = styled.FlatList``;
const AddressBox = styled.View`
  border-radius: 10px;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  flex-direction: row;
  align-items: center;
  padding: 0 ${verticalScale(10)}px;
  height: ${verticalScale(45)}px;
  z-index: 100;
`;
const IconTouch = styled.TouchableOpacity`
  margin-right: ${verticalScale(8)}px;
`;
const SearchIcon = styled(AntDesign)`
  color: ${(props: any) => (props.background ? props.background : Helper.getColor().secondaryTxt)};
  font-size: ${moderateScale(20)}px;
`;
const Input = styled.TextInput`
  width: 90%;
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primaryTxt)};
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
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().plane)};
  opacity: 0.4;
  width: 90%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(LocationBox);
