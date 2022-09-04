import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import ErrorBoundary from 'react-native-error-boundary';
import { initStripe } from '@stripe/stripe-react-native';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import { USER_KEY } from '@config/constants';
import { storeUser, setNetwork, IUser } from '@modules/auth/store/reducer';
import { useAppDispatch } from '@config/store';
import Helper from '@config/helper';
import Route from '@config/route';
import { fetchStripeKey, fetchCountry } from '@modules/auth/store/action';
import Socket from '@config/socket';

interface IData {
  user?: IUser;
  loading?: boolean;
}
Helper.setLocale();
export default () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IData>({
    loading: true,
  });

  const handler = async () => {
    await SplashScreen.preventAutoHideAsync();
    await checkUser();
  };

  useEffect(() => {
    handler().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    dispatch(fetchCountry());
    const user = await Helper.getItem(USER_KEY);
    await dispatch(storeUser({ user }));
    setupStripe().then();
    done({ user });
  };

  const setupStripe = async () => {
    const publishableKey = await fetchStripeKey();
    typeof publishableKey == 'string' && (await initStripe({ publishableKey }));
  };

  const done = (value: IData) => {
    loadAsset().then(async () => {
      setData({ ...value, loading: false });
      await SplashScreen.hideAsync();
    });
  };

  const loadAsset = async () => {
    await Asset.loadAsync([require('./assets/media/splash.png')]);
    await Font.loadAsync({
      ExtraLight: require('./assets/font/Niramit/Niramit-ExtraLight.ttf'),
      Light: require('./assets/font/Niramit/Niramit-Light.ttf'),
      Regular: require('./assets/font/Niramit/Niramit-Regular.ttf'),
      RegularItalic: require('./assets/font/Niramit/Niramit-Italic.ttf'),
      Medium: require('./assets/font/Niramit/Niramit-Medium.ttf'),
      SemiBold: require('./assets/font/Niramit/Niramit-SemiBold.ttf'),
      Bold: require('./assets/font/Niramit/Niramit-Bold.ttf'),
    });
  };

  const networkHandler = (state: any) => dispatch(setNetwork(state));

  const errorHandler = (_error: Error, _stackTrace: string) => {
    /* Log the error to an error reporting service */
  };

  return (
    <ErrorBoundary onError={errorHandler}>
      <InternetConnectionAlert onChange={networkHandler}>
        {!data.loading && <Route user={data.user} />}
      </InternetConnectionAlert>
      <Toast />
      <Socket />
    </ErrorBoundary>
  );
};
