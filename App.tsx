import React from 'react';
import { NetInfoState } from '@react-native-community/netinfo';
import { initStripe } from '@stripe/stripe-react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import { setLocale } from '@config/helpers';
import Route from '@config/route';
import { useAppDispatch, persist } from '@config/store';
import { fetchStripeKey, fetchCountry } from '@modules/auth/store/action';
import { setNetwork } from '@modules/auth/store/reducer';
import Loader from '@shared/common/Loader';
import useNotification from '@shared/hooks/useNotification';
import useSocket from '@shared/hooks/useSocket';

setLocale();
export default () => {
  useNotification();
  useSocket();
  const dispatch = useAppDispatch();

  const setupStripe = async () => {
    const publishableKey = await fetchStripeKey();
    if (publishableKey) {
      await initStripe({ publishableKey });
    }
  };

  const loadAsset = async () => {
    await Asset.loadAsync([
      require('@assets/media/splash.png'),
    ]);
    await Font.loadAsync({
      ExtraLight: require('@assets/font/Niramit/Niramit-ExtraLight.ttf'),
      Light: require('@assets/font/Niramit/Niramit-Light.ttf'),
      Regular: require('@assets/font/Niramit/Niramit-Regular.ttf'),
      RegularItalic: require('@assets/font/Niramit/Niramit-Italic.ttf'),
      Medium: require('@assets/font/Niramit/Niramit-Medium.ttf'),
      SemiBold: require('@assets/font/Niramit/Niramit-SemiBold.ttf'),
      Bold: require('@assets/font/Niramit/Niramit-Bold.ttf'),
    });
  };

  const networkHandler = (state: NetInfoState) => dispatch(setNetwork(state));

  const loadApp = async () => {
    dispatch(fetchCountry());
    await loadAsset();
    await setupStripe();
  };

  return (
    <PersistGate
      loading={<Loader />}
      persistor={persist}
      onBeforeLift={loadApp}
    >
      <InternetConnectionAlert onChange={networkHandler}>
        <Route />
      </InternetConnectionAlert>
      <Toast />
    </PersistGate>
  );
};
