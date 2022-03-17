import i18n from 'i18n-js';
import axios from 'axios';
import styled from 'styled-components';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useColorScheme } from 'react-native';
import React, { useRef, useState } from 'react';
import Geocoder from 'react-native-geocoding';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Region, MAP_TYPES } from 'react-native-maps';
import Helper from '@config/helper';
import LocationBox from '@common/location-box';
import Button from '@form/button';

interface Props {
  longitude?: number;
  latitude?: number;
  longitudeDelta?: number;
  latitudeDelta?: number;
  btnTitle?: string;
  onError: (message: string) => void;
  visible: boolean;
  close: () => void;
  done: (location: any) => void;
  apiKey: string;
  countryCode?: string;
}

const defaultLocation = {
  latitude: 25.2048,
  longitude: 55.2708,
  latitudeDelta: 0.00922 * 1.5,
  longitudeDelta: 0.00421 * 1.5,
};

const googleApi = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
const googlePlaceApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

export default (props: Props) => {
  const scheme = useColorScheme();
  const mapRef: any = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [location, setLocation] = useState<any>({
    latitude: props.latitude ? props.latitude : defaultLocation.latitude,
    longitude: props.longitude ? props.longitude : defaultLocation.longitude,
    latitudeDelta: props.latitudeDelta ? props.latitudeDelta : defaultLocation.latitudeDelta,
    longitudeDelta: props.longitudeDelta ? props.longitudeDelta : defaultLocation.longitudeDelta,
  });

  const checkLocation = () => {
    if (!(props.longitude && props.latitude)) {
      setLoading(true);
      Location.getForegroundPermissionsAsync().then((res) => {
        setLoading(false);
        if (res.status === 'granted') getLocation().then();
        else getPermission();
      });
    } else onRegionChange(location);
  };

  const getPermission = () => {
    Location.requestForegroundPermissionsAsync().then((res) => {
      if (res.status === 'granted') getLocation().then();
      else {
        props.onError(i18n.t('location_permission_error'));
        onRegionChange(location);
      }
    });
  };

  const getLocation = async () => {
    setLoading(true);
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      if (currentLocation.coords.latitude) {
        const region: any = {
          ...location,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
        mapRef?.current.animateToRegion(region, 1000);
        onRegionChange(region);
      } else onRegionChange(location);
    } catch (e) {
      onRegionChange(location);
    }
    setLoading(false);
  };

  const onRegionChange = (region: Region) => {
    setLoading(true);
    Geocoder.init(props.apiKey);
    Geocoder.from(region.latitude, region.longitude)
      .then((res: any) => {
        const locationDetails = res.results[0].address_components;
        const locationAddress = res.results[0].formatted_address,
          place_id = res.results[0].place_id;
        let city = '',
          zip = '',
          country = '';
        locationDetails.map((item: any) => {
          if (item.types[0] === 'locality') city = item.long_name;
          if (item.types[0] === 'postal_code') zip = item.long_name;
          if (item.types[0] === 'country') country = item.long_name;
        });
        setLocation({
          ...region,
          address: locationAddress,
          city,
          zip,
          country,
          place_id,
        });
        setAddress(locationAddress);
        setLoading(false);
      })
      .catch((error: any) => {
        if (error.origin) props.onError(error.origin.error_message);
        else error.message && props.onError(error.message);
        setLoading(false);
      });
  };

  const setType = () => {
    setMapType(mapType === MAP_TYPES.STANDARD ? MAP_TYPES.SATELLITE : MAP_TYPES.STANDARD);
  };

  const suggestLocation = (query: string) => {
    setAddress(query);
    let api = `${googleApi}${query}&key=${props.apiKey}`;
    if (props.countryCode) api = `${api}&components=country:${props.countryCode.toLowerCase()}`;
    axios
      .get(api)
      .then((res) => {
        setSuggestions(res.data.predictions);
      })
      .catch((e) => console.log(e.response));
  };

  const getGeometry = (placeId: string) => {
    setLoading(true);
    axios
      .get(`${googlePlaceApi}${placeId}&key=${props.apiKey}`)
      .then((res) => {
        setLoading(false);
        const geometry = res.data.result.geometry.location;
        const region = {
          ...location,
          latitude: geometry.lat,
          longitude: geometry.lng,
        };
        mapRef.current && mapRef.current.animateToRegion(region, 1000);
        onRegionChange(region);
      })
      .catch((_e) => {
        setLoading(false);
        props.onError(i18n.t('geometry_error'));
      });
  };

  const done = () => props.done(location);

  return (
    <Modal
      transparent={true}
      onShow={checkLocation}
      visible={props.visible}
      animationType={'slide'}
      onRequestClose={() => console.log()}
    >
      <Wrap scheme={scheme}>
        <Map
          mapType={mapType}
          ref={mapRef}
          initialRegion={location}
          onRegionChangeComplete={(region: any) => onRegionChange(region)}
        >
          <Marker coordinate={location} pinColor={Helper.getColor().chatBoxTwo} draggable />
        </Map>
        <AddressWrap>
          <BackTouch onPress={props.close}>
            <BackIcon name={'long-arrow-left'} color={Helper.getColor().primary} />
          </BackTouch>
          <LocationBox
            loading={loading}
            geometry={getGeometry}
            change={suggestLocation}
            suggestions={suggestions}
            address={loading ? i18n.t('fetching_location') : address}
          />
        </AddressWrap>
        <Footer>
          <SatelliteBox>
            <IconTouch onPress={setType} space background={Helper.getColor().plane}>
              <GlobeIcon name={'md-globe'} color={Helper.getColor().primary} />
            </IconTouch>
            <IconTouch onPress={getLocation} background={Helper.getColor().plane}>
              <LocateIcon name={'my-location'} color={Helper.getColor().primary} />
            </IconTouch>
          </SatelliteBox>
          <Button
            shadow
            press={done}
            loading={loading}
            title={props.btnTitle ? props.btnTitle : ''}
          />
        </Footer>
      </Wrap>
    </Modal>
  );
};

const Modal = styled.Modal`
  flex: 1;
`;
const Wrap = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: space-between;
  padding: ${verticalScale(5)}px ${verticalScale(15)}px ${verticalScale(20)}px
    ${verticalScale(15)}px;
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
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primary)};
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
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  margin-bottom: ${(props: { space: any }) => (props.space ? verticalScale(10) : '0')}px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const GlobeIcon = styled(Ionicons)`
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primary)};
  font-size: ${moderateScale(20)}px;
  margin-top: 1px;
  margin-left: 1px;
`;
const LocateIcon = styled(MaterialIcons)`
  color: ${(props: any) => (props.color ? props.color : Helper.getColor().primary)};
  font-size: ${moderateScale(20)}px;
`;
