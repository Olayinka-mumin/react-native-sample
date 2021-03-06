import i18n from 'i18n-js';
import Moment from 'moment';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Appearance } from 'react-native';
import * as Localization from 'expo-localization';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerOptions } from 'expo-document-picker';
import { ImageInfo, ImagePickerOptions } from 'expo-image-picker';
import Toast, { ToastShowParams } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { colors } from './constant';
import resource from './language';

class Helper {
  public lang: string;
  public token: string | undefined | null;

  constructor() {
    this.lang = 'en';
  }

  toast = (data: ToastShowParams) => {
    Toast.show({
      ...data,
      type: data.type ? data.type : 'info', // 'success | error | info'
      position: data.position ? data.position : data.type === 'error' ? 'bottom' : 'top', // 'top | bottom'
      visibilityTime: data.visibilityTime ? data.visibilityTime : 4000,
      autoHide: data.autoHide ? data.autoHide : true,
    });
  };

  getItem = async (key: string) => {
    try {
      const val = await AsyncStorage.getItem(key);
      return JSON.parse(val as string);
    } catch (_error) {}
  };

  setItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {}
  };

  removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (_error) {}
  };

  getColor = () => {
    const dark = Appearance.getColorScheme() === 'dark';
    return {
      primary: dark ? colors.primaryDark : colors.primary,
      secondary: dark ? colors.secondaryDark : colors.secondary,
      primaryView: dark ? colors.primaryDark : colors.primary,
      plane: dark ? colors.planeDark : colors.plane,
      primaryTxt: dark ? colors.primaryTextDark : colors.primaryText,
      secondaryTxt: dark ? colors.secondaryTxtDark : colors.secondaryTxt,
      background: dark ? colors.backgroundDark : colors.background,
      chatBoxOne: dark ? colors.chatBoxOneDark : colors.chatBoxOne,
      chatBoxTwo: dark ? colors.chatBoxTwoDark : colors.chatBoxTwo,
    };
  };

  setLocale = () => {
    i18n.translations = resource;
    i18n.locale = Localization.locale;
    i18n.fallbacks = true;
    this.lang = Localization.locale;
  };

  defaultPermission = async (access: string) => {
    let granted = true;
    await new Promise(async (resolve) => {
      await Alert.alert(
        i18n.t('let_app_access', { access }),
        i18n.t('permission_msg', { access }),
        [
          {
            style: 'destructive',
            text: i18n.t('not_now'),
            onPress: () => {
              granted = false;
              resolve(granted);
            },
          },
          {
            text: i18n.t('give_access'),
            onPress: () => {
              granted = true;
              resolve(granted);
            },
          },
        ]
      );
    });
    return granted;
  };

  mediaPicker = async (type: string, options?: ImagePickerOptions) => {
    // Type options: 'camera', 'library', 'document'
    switch (type) {
      case 'camera': {
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        if (status === 'granted') return this.launchMedia(type, options);
        else {
          const preRequest = await this.defaultPermission('Camera');
          if (!preRequest) return permitError();
          const res = await ImagePicker.requestCameraPermissionsAsync();
          if (res.status === 'granted') return this.launchMedia(type, options);
          else return { error: true, status: res.status };
        }
      }
      case 'library': {
        const res = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (res.status === 'granted') return this.launchMedia('library');
        else {
          const preRequest = await this.defaultPermission('Photos');
          if (!preRequest) return permitError();
          const res2 = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (res2.status === 'granted') return this.launchMedia('library');
          else return { error: true, status: res2.status };
        }
      }
      case 'document':
        return await DocumentPicker.getDocumentAsync(options as DocumentPickerOptions);
    }
  };

  currentLocation = async (ignore?: boolean) => {
    return Location.getForegroundPermissionsAsync().then(async (res) => {
      if (res.status === 'granted') return await this.getLocation();
      else {
        if (ignore) return null;
        const preRequest = await this.defaultPermission('Location');
        if (!preRequest) return permitError(i18n.t('location_permission_error'));
        return Location.requestForegroundPermissionsAsync().then(async (res2) => {
          if (res2.status === 'granted') return await this.getLocation();
          return permitError(i18n.t('location_permission_error'));
        });
      }
    });
  };

  getLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      if (currentLocation.coords.latitude) return { ...currentLocation.coords };
      return null;
    } catch (e) {
      return null;
    }
  };

  launchMedia = async (type: string, options?: ImagePickerOptions) => {
    const img =
      type === 'camera'
        ? await ImagePicker.launchCameraAsync({ quality: 0, ...options })
        : await ImagePicker.launchImageLibraryAsync({ quality: 0, ...options });
    if (img.cancelled || img.type !== 'image') return img;
    return this.compressImg(img);
  };

  compressImg = async (img: ImageInfo) => {
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
      { compress: 0.0, format: SaveFormat.JPEG }
    );
    return { ...img, ...result };
  };

  formatFile = (file: any) => {
    const filename = file.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `${getFileType(match[1])}/${match[1]}` : file.type ? file.type : 'file';
    return { uri: file.uri, name: filename, type };
  };

  base64Converter = async (uri: string) => {
    return await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  };

  getDate = (date: Date) => {
    if (new Date(date).toDateString() === new Date().toDateString()) {
      return `${Moment(new Date(date)).format('h:mm a')}`;
    } else return Moment(new Date(date)).calendar();
  };

  returnError = (error: any) => {
    // console.log(error, error.response);
    if (!error.response && error.message) return error.message;
    else if (error.response.data.message) return error.response.data.message;
    else if (error.response.data.error?.message.length) return error.response.data.error.message[0];
    else return i18n.t('encounter_error');
  };
}

let getFileType = (type: string) => {
  switch (type) {
    case 'pdf':
      return 'application';
    case 'doc':
      return 'application';
    case 'docx':
      return 'application';
    case 'audio':
      return 'audio';
    case 'video':
      return 'video';
    default:
      return 'image';
  }
};

const permitError = (message?: string, status?: string) => {
  return {
    error: true,
    status: status ? status : 'denied',
    message: message ? message : i18n.t('permission_error'),
  };
};

let getCompressionSize = (size?: number) => {
  if (size && size < 1) return 1;
  else if (size && size < 2) return 2;
  else if (size && size > 3) return 2;
  else return 1;
};

export default new Helper();
