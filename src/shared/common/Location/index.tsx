import React, { useRef, useState } from 'react';
import axios from 'axios';
import i18n from 'i18n-js';
import { useColorScheme } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker, Region, MAP_TYPES } from 'react-native-maps';
import { getCurrentLocation, getColor, convertKeysCase } from '@config/helpers';
import { ILocation, ILocationSuggestion } from '@config/models';
import LocationBox from '@shared/common/LocationBox';
import Button from '@shared/form/Button';
import Styles from './styles';

interface Props {
  longitude?: number;
  latitude?: number;
  longitudeDelta?: number;
  latitudeDelta?: number;
  btnTitle?: string;
  onError: (message: string) => void;
  isVisible: boolean;
  onClose: () => void;
  onDone: (location: ILocation) => void;
  apiKey: string;
  countryCode?: string;
}

const defaultLocation: ILocation = {
  latitude: 25.2048,
  longitude: 55.2708,
  latitudeDelta: 0.00922 * 1.5,
  longitudeDelta: 0.00421 * 1.5,
};

const googleApi = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
const googlePlaceApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

export default ({
  longitude,
  latitude,
  latitudeDelta,
  longitudeDelta,
  btnTitle,
  onError,
  isVisible,
  onClose,
  onDone,
  apiKey,
  countryCode,
}: Props) => {
  const scheme = useColorScheme();
  const mapRef = useRef<MapView | null>(null);
  const [suggestions, setSuggestions] = useState<ILocationSuggestion[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [location, setLocation] = useState<ILocation>({
    latitude: latitude || defaultLocation.latitude,
    longitude: longitude || defaultLocation.longitude,
    latitudeDelta: latitudeDelta || defaultLocation.latitudeDelta,
    longitudeDelta: longitudeDelta || defaultLocation.longitudeDelta,
  });

  const onRegionChange = async (region: Region) => {
    setIsLoading(true);
    Geocoder.init(apiKey);
    try {
      const { results } = await Geocoder.from(region.latitude, region.longitude);
      const locationDetails = results[0].address_components;
      const locationAddress = results[0].formatted_address;
      let city = '';
      let postalCode = '';
      let country = '';
      locationDetails.forEach((item) => {
        if (item.types[0] === 'locality') {
          city = item.long_name;
        }
        if (item.types[0] === 'postal_code') {
          postalCode = item.long_name;
        }
        if (item.types[0] === 'country') {
          country = item.long_name;
        }
      });
      setLocation({
        ...region,
        address: locationAddress,
        city,
        postalCode,
        country,
      });
      setAddress(locationAddress);
      setIsLoading(false);
    } catch (e: unknown) {
      const { origin, message } = e as {
        origin?: { 'error_message': string },
        message?: string,
      };
      if (origin) {
        onError(origin.error_message);
      }
      if (message) {
        onError(message);
      }
      setIsLoading(false);
    }
  };

  const getLocation = async () => {
    setIsLoading(true);
    const currentLocation = await getCurrentLocation(
      false,
    );
    setIsLoading(false);
    if ('error' in currentLocation) {
      onError(currentLocation.message);
      await onRegionChange(location);
    } else {
      const region: ILocation = {
        ...location,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      };
      mapRef.current?.animateToRegion(region, 1000);
      await onRegionChange(region);
    }
  };

  const checkLocation = async () => {
    if (!longitude || !longitude) {
      await getLocation();
    } else {
      await onRegionChange(location);
    }
  };

  const setType = () => {
    setMapType(
      mapType === MAP_TYPES.STANDARD
        ? MAP_TYPES.SATELLITE
        : MAP_TYPES.STANDARD,
    );
  };

  const handleSuggestLocation = (query: string) => {
    setAddress(query);
    let api = `${googleApi}${query}&key=${apiKey}`;
    if (countryCode) {
      api = `${api}&components=country:${countryCode.toLowerCase()}`;
    }
    axios
      .get(api)
      .then((res) => {
        setSuggestions(
          convertKeysCase(
            res.data.predictions,
            'camelCase',
          ) as ILocationSuggestion[],
        );
      });
  };

  const handleGetGeometry = async (placeId: string) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${googlePlaceApi}${placeId}&key=${apiKey}`,
      );
      setIsLoading(false);
      const geometry = res.data.result.geometry.location;
      const region = {
        ...location,
        latitude: geometry.lat,
        longitude: geometry.lng,
      };
      mapRef.current?.animateToRegion(region, 1000);
      await onRegionChange(region);
    } catch (e) {
      setIsLoading(false);
      onError(i18n.t('geometry_error'));
    }
  };

  return (
    <Styles.Modal
      transparent
      onShow={checkLocation}
      visible={isVisible}
      animationType="slide"
    >
      <Styles.Wrap scheme={scheme}>
        <Styles.Map
          mapType={mapType}
          ref={mapRef}
          initialRegion={location}
          onRegionChangeComplete={(region: Region) => onRegionChange(region)}
        >
          <Marker coordinate={location} pinColor={getColor().chatBoxTwo} draggable />
        </Styles.Map>
        <Styles.AddressWrap>
          <Styles.BackTouch onPress={onClose}>
            <Styles.BackIcon name="long-arrow-left" color={getColor().primary} />
          </Styles.BackTouch>
          <LocationBox
            isLoading={isLoading}
            onGetGeometry={handleGetGeometry}
            onChange={handleSuggestLocation}
            suggestions={suggestions}
            address={isLoading ? i18n.t('fetching_location') : address}
          />
        </Styles.AddressWrap>
        <Styles.Footer>
          <Styles.SatelliteBox>
            <Styles.IconTouch
              onPress={setType}
              space
              background={getColor().plane}
            >
              <Styles.GlobeIcon
                name="md-globe"
                color={getColor().primary}
              />
            </Styles.IconTouch>
            <Styles.IconTouch
              onPress={getLocation}
              background={getColor().plane}
            >
              <Styles.LocateIcon
                name="my-location"
                color={getColor().primary}
              />
            </Styles.IconTouch>
          </Styles.SatelliteBox>
          <Button
            onPress={() => onDone(location)}
            isLoading={isLoading}
            title={btnTitle || ''}
          />
        </Styles.Footer>
      </Styles.Wrap>
    </Styles.Modal>
  );
};
