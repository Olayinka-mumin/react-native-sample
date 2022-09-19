import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Keyboard,
} from 'react-native';
import { getColor } from '@config/helpers';
import { ILocationSuggestion } from '@config/models';
import Styles from './style';

const EachAddress = ({ press, title }: { press: () => void; title: string }) => (
  <Styles.AddressWrap onPress={press}>
    <Styles.Bullets name="dot-single" />
    <Styles.BulletTxt
      color={getColor().primaryText}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {title}
    </Styles.BulletTxt>
  </Styles.AddressWrap>
);

interface Props {
  onChange: (query: string) => void;
  onGetGeometry: (placeId: string) => void;
  suggestions?: { description: string, placeId: string }[];
  address: string;
  isLoading: boolean;
}

export default ({
  onChange,
  onGetGeometry,
  suggestions,
  address,
  isLoading,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [icon, setIcon] = useState('icon');
  const yAxis = useRef(new Animated.Value(-50)).current;

  const slide = (visible: boolean) => {
    Animated.spring(yAxis, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsVisible(visible);
  };

  const handleChange = (query: string) => {
    if (query !== '') {
      slide(true);
    }
    onChange(query);
  };

  const handleSelect = (placeId: string) => {
    onGetGeometry(placeId);
    slide(false);
  };

  const keyExtractor = (item: ILocationSuggestion, index: number) => index.toString();
  const renderItem = ({ item }: { item: ILocationSuggestion }) => (
    <EachAddress
      title={item.description}
      press={() => handleSelect(item.placeId)}
    />
  );

  const handleIconPress = () => {
    Keyboard.dismiss();
    slide(false);
  };

  return (
    <Styles.Wrap>
      <Styles.AddressBox background={getColor().plane}>
        <Styles.IconTouch
          onPress={!isLoading && handleIconPress}
        >
          {isLoading ? (
            <ActivityIndicator color={getColor().secondaryText} />
          ) : (
            <Styles.SearchIcon name={icon} color={getColor().secondaryText} />
          )}
        </Styles.IconTouch>
        <Styles.Input
          value={address}
          onChangeText={handleChange}
          placeholder="Type Location"
          color={getColor().primaryText}
          underlineColorAndroid="transparent"
          onFocus={() => setIcon('close')}
          onBlur={() => setIcon('search1')}
        />
      </Styles.AddressBox>
      {isVisible && (
        <Styles.ListWrap>
          <Styles.ListBox
            style={[{ transform: [{ translateY: yAxis }] }]}
            background={getColor().plane}
          >
            <Styles.List
              data={suggestions}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
            />
          </Styles.ListBox>
        </Styles.ListWrap>
      )}
    </Styles.Wrap>
  );
};
