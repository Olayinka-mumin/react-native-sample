import io from 'socket.io-client';
import styled from 'styled-components';
import Constants from 'expo-constants';
import { AppState } from 'react-native';
import Echo from 'laravel-echo/dist/echo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Helper from '@config/helper';
import { NOTIFICATION_APP_ID } from '@config/constant';
import { socketBaseURL } from '@config/client';
import { RootState, useAppDispatch } from '@config/store';
import { queryOne } from '@modules/auth/store/action';

const env = ['standalone', 'storeClient'];

const Wrap = styled.View`
  flex: 0;
`;

export default () => {
  const dispatch = useAppDispatch();
  const user: any = useSelector((s: RootState) => s.auth.user);
  const [appState, setAppState] = useState(AppState.currentState);
  const [echo, setEcho] = useState<Echo>();
  const signal =
    !env.includes(Constants.executionEnvironment) && require('react-native-onesignal').default;

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', () => {});
  }, []);

  useEffect(() => {
    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uuid, appState]);

  useEffect(() => {
    Helper.token &&
      setEcho(
        new Echo({
          broadcaster: 'socket.io',
          host: socketBaseURL,
          client: io,
          auth: {
            headers: {
              Authorization: 'Bearer ' + Helper.token,
            },
          },
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Helper.token]);

  let connect = () => {
    user && connectSocket();
    signal && user && connectSignal();
  };

  let connectSocket = async () => {
    echo?.private(`user.${user.id}`).listen('Changes', () => {
      dispatch(queryOne());
    });
  };

  let handleAppStateChange = async (nextAppState: any) => setAppState(nextAppState);

  let connectSignal = async () => {
    await signal.setLogLevel(6, 0);
    await signal.setAppId(NOTIFICATION_APP_ID);
    user.uuid && (await signal.setExternalUserId(user.uuid));
    user.phone && (await signal.sendTag('phone', user.phone));
    await promptNotification();
    await handleForegroundNotification();
    await handleNotificationOpened();
  };

  let promptNotification = () => {
    signal.promptForPushNotificationsWithUserResponse(() => {});
  };

  let handleForegroundNotification = () => {
    signal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: any) => {
      const notification = notificationReceivedEvent.getNotification();
      notificationReceivedEvent.complete(notification);
    });
  };

  let handleNotificationOpened = () => {
    signal.setNotificationOpenedHandler(() => {});
  };

  return <Wrap />;
};
