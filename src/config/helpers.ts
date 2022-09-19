import { AxiosError } from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerOptions } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo, ImagePickerOptions, PermissionStatus } from 'expo-image-picker';
import * as Localization from 'expo-localization';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import { FormikValues } from 'formik';
import i18n from 'i18n-js';
import { Alert, Appearance } from 'react-native';
import Toast, { ToastShowParams } from 'react-native-toast-message';
import { IMediaOptions, IPermissionError, IRequestError } from '@config/models';
import { colors, colorsDark } from './constants';
import resource from './language';

export const showToast = (data: ToastShowParams) => {
  Toast.show({
    ...data,
    type: data.type || 'info',
    position: data.position || data.type === 'error' ? 'bottom' : 'top',
    visibilityTime: data.visibilityTime || 4000,
    autoHide: data.autoHide || true,
  });
};

export const getColor = () => {
  const dark = Appearance.getColorScheme() === 'dark';
  return dark ? colorsDark : colors;
};

export const setLocale = () => {
  i18n.translations = resource;
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};

export const defaultPermission = async (access: string): Promise<boolean> => (
  new Promise((resolve) => {
    Alert.alert(
      i18n.t('let_app_access', { access }),
      i18n.t('permission_msg', { access }),
      [
        {
          style: 'destructive',
          text: i18n.t('not_now'),
          onPress: () => {
            resolve(false);
          },
        },
        {
          text: i18n.t('give_access'),
          onPress: () => {
            resolve(true);
          },
        },
      ],
    );
  })
);

const getCompressionSize = (size?: number) => {
  if (size && size < 1) {
    return 1;
  }
  if (size && size < 2) {
    return 2;
  }
  if (size && size > 3) {
    return 2;
  }
  return 1;
};

const compressImg = async (img: ImageInfo) => {
  const info = await FileSystem.getInfoAsync(img.uri);
  const size = info.size && info.size / 1e6;
  const result = await manipulateAsync(
    img.uri,
    [
      {
        resize: {
          width: img.width / getCompressionSize(size),
          height: img.height / getCompressionSize(size),
        },
      },
    ],
    { compress: 0.0, format: SaveFormat.JPEG },
  );
  return { ...img, ...result };
};

const launchMedia = async (
  type: IMediaOptions,
  shouldCompress?: boolean,
  options?: ImagePickerOptions,
) => {
  const img = type === 'camera'
    ? await ImagePicker.launchCameraAsync({ quality: 0, ...options })
    : await ImagePicker.launchImageLibraryAsync({ quality: 0, ...options });
  if (img.cancelled || img.type !== 'image') {
    return img;
  }
  if (shouldCompress) {
    return compressImg(img);
  }
  return img;
};

const permitError = (status?: PermissionStatus, message?: string): IPermissionError => ({
  error: true,
  status: status || PermissionStatus.DENIED,
  message: message || i18n.t('permission_error'),
});

const cameraPickerHandler = async (
  type: 'camera' | 'library',
  shouldCompress?: boolean,
  options?: ImagePickerOptions,
) => {
  const { status } = await ImagePicker.getCameraPermissionsAsync();
  if (status === 'granted') {
    return launchMedia(type, shouldCompress, options);
  }
  const preRequest = await defaultPermission('Camera');
  if (!preRequest) {
    return permitError();
  }

  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission.status === 'granted') {
    return launchMedia(type, shouldCompress, options);
  }
  return permitError(permission.status);
};

const libraryPickerHandler = async () => {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status === 'granted') {
    return launchMedia('library');
  }
  const preRequest = await defaultPermission('Photos');
  if (!preRequest) {
    return permitError();
  }
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permission.status === 'granted') {
    return launchMedia('library');
  }
  return { error: true, status: permission.status };
};

export const mediaPicker = async (
  type: IMediaOptions,
  shouldCompress?: boolean,
  options?: ImagePickerOptions,
) => {
  switch (type) {
    case 'camera': {
      return cameraPickerHandler(type, shouldCompress, options);
    }
    case 'library': {
      return libraryPickerHandler();
    }
    case 'document': {
      return DocumentPicker.getDocumentAsync(options as DocumentPickerOptions);
    }
    default: {
      return permitError(i18n.t('invalid_media_picker_type', { type }));
    }
  }
};

const getLocation = async (): Promise<LocationObjectCoords | IPermissionError> => {
  try {
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    if (currentLocation.coords.latitude) {
      return { ...currentLocation.coords };
    }
    return permitError(
      PermissionStatus.UNDETERMINED,
      i18n.t('current_location_failed'),
    );
  } catch (e) {
    return permitError(
      PermissionStatus.UNDETERMINED,
      i18n.t('current_location_failed'),
    );
  }
};

export const getCurrentLocation = async (
  ignorePermissionRequest?: boolean,
): Promise<LocationObjectCoords | IPermissionError> => {
  const foregroundPermissionResponse = await Location.getForegroundPermissionsAsync();
  if (foregroundPermissionResponse.status === 'granted') {
    return getLocation();
  }
  if (ignorePermissionRequest) {
    return permitError(PermissionStatus.UNDETERMINED, '');
  }
  const preRequest = await defaultPermission('Location');
  if (!preRequest) {
    return permitError(i18n.t('location_permission_error'));
  }
  const foregroundPermissionRequestResponse = await Location.requestForegroundPermissionsAsync();
  if (foregroundPermissionRequestResponse.status === 'granted') {
    return getLocation();
  }
  return permitError(i18n.t('location_permission_error'));
};

export const base64Converter = async (uri: string) => (
  FileSystem.readAsStringAsync(uri, { encoding: 'base64' })
);

const toSnakeCase = (value: string) => value.replace(
  /[A-Z]/g,
  (letter) => `_${letter.toLowerCase()}`,
);

export const toCamelCase = (s: string) => s.replace(
  /([-_][a-z])/ig,
  ($1) => $1.toUpperCase()
    .replace('_', '')
    .replace(' ', ''),
);

const isArray = (value: unknown) => Array.isArray(value);

const isObject = (value: unknown) => (
  value === Object(value)
  && !isArray(value)
  && typeof value !== 'function'
);

export type caseType = 'camelCase' | 'snakeCase';

export const convertKeysCase = (o: unknown, type?: caseType): object => {
  if (isObject(o)) {
    let value = {};
    Object.keys(o as object).forEach((k) => {
      const val = o as { [key: string]: string | object | number | [] };
      value = {
        ...value,
        [type === 'snakeCase' ? toSnakeCase(k) : toCamelCase(k)]: convertKeysCase(val[k], type),
      };
    });
    return value;
  } else if (isArray(o)) {
    const value = o as Array<unknown>;
    return value.map((i) => convertKeysCase(i as object, type));
  }

  return o as object;
};

export const getInitials = (firstName: string, lastName: string) => {
  const firstNameSubstring = firstName.charAt(0).toUpperCase();
  const lastNameSubstring = lastName.charAt(0).toUpperCase();
  return `${firstNameSubstring}${lastNameSubstring}`;
};

export const getChangedFormikValues = (values: FormikValues, initialValues: FormikValues) => Object
  .entries(values)
  .reduce((
    agg: FormikValues,
    [key, value],
  ) => {
    const hasChanged = initialValues[key] !== value;
    if (hasChanged) {
      agg[key] = value;
    }
    return agg;
  }, {});

export const returnError = (error: AxiosError) => {
  let message = i18n.t('encounter_error');
  const errors = error.response?.data.errors
    ? convertKeysCase(error.response.data.errors, 'camelCase') as IRequestError[]
    : [];
  if (!error.response && error.message) {
    message = error.message;
  } else if (error.response?.data.message) {
    message = error.response.data.message;
  } else if (error.response?.data.error?.message?.length) {
    message = error.response.data.error.message[0] as string;
  }
  return JSON.stringify({ message, errors });
};
