import { PermissionStatus } from 'expo-image-picker';
import { Region } from 'react-native-maps';

export type IMediaOptions = 'camera' | 'library' | 'document';

export interface IPermissionError {
  error: boolean;
  status: PermissionStatus;
  message: string;
}

export interface IRequestError {
  field: string;
  message: string;
}

export interface IRequestErrorResponse {
  message: string;
  errors: IRequestError[];
}

export interface ILocation extends Region {
  address?: string;
  city?: string
  state?: string;
  postalCode?: string;
  country?: string
}

export interface ILocationSuggestion {
  description: string;
  placeId: string;
}

export type IAutoCompleteType =
  'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'name'
  | 'password'
  | 'postal-code'
  | 'street-address'
  | 'tel'
  | 'username'
  | 'off';
