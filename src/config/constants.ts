import Constants from 'expo-constants';
import {
  REACT_APP_NOTIFICATION_APP_ID,
  REACT_APP_BASE_URL,
  REACT_APP_DEV_BASE_URL,
  REACT_APP_SOCKET_BASE_URL,
  REACT_APP_DEV_SOCKET_BASE_URL,
  REACT_APP_MAP_API_KEY,
} from 'react-native-dotenv';

const devEnv = {
  NOTIFICATION_APP_ID: REACT_APP_NOTIFICATION_APP_ID,
  BASE_URL: REACT_APP_DEV_BASE_URL,
  SOCKET_BASE_URL: REACT_APP_DEV_SOCKET_BASE_URL,
  MAP_API_KEY: REACT_APP_MAP_API_KEY,
};

const prodEnv = {
  NOTIFICATION_APP_ID: REACT_APP_NOTIFICATION_APP_ID,
  BASE_URL: REACT_APP_BASE_URL,
  SOCKET_BASE_URL: REACT_APP_SOCKET_BASE_URL,
  MAP_API_KEY: REACT_APP_MAP_API_KEY,
};

export const env = __DEV__ || Constants.manifest?.releaseChannel === 'dev'
  ? devEnv
  : prodEnv;

export const USER_KEY = 'user';
export const colors = {
  primary: '#0a78a1',
  secondary: '#0a78a1',
  primaryText: '#3C4656',
  secondaryText: '#77869E',
  plane: '#ffffff',
  background: '#F2F5F7',
  chatBoxOne: '#E4E8EB',
  chatBoxTwo: '#0a78a1',
  errorRed: '#ff4f58',
  borderColor: 'rgba(173,172,170, 0.6)',
};

export const colorsDark = {
  primary: '#0a78a1',
  secondary: '#0a78a1',
  primaryText: '#ffffff',
  secondaryText: 'rgba(255,255,255,0.8)',
  plane: 'rgb(23,23,23)',
  background: 'rgb(2,2,2)',
  chatBoxOne: '#3c3b3d',
  chatBoxTwo: '#0a78a1',
  errorRed: '#ff4f58',
  borderColor: '#333236',
};

export const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
