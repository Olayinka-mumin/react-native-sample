import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { AppState, AppStateStatus } from 'react-native';
import { NotificationReceivedEvent } from 'react-native-onesignal';
import { useSelector } from 'react-redux';
import { env } from '@config/constants';
import { RootState } from '@config/store';

const executionEnvironments = ['standalone', 'storeClient'];

export default () => {
  const user = useSelector((s: RootState) => s.auth.user);
  const [appState, setAppState] = useState(AppState.currentState);
  const signal = !executionEnvironments.includes(Constants.executionEnvironment)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    && require('react-native-onesignal').default;

  const handleAppStateChange = async (nextAppState: AppStateStatus) => (
    setAppState(nextAppState)
  );

  const promptNotification = () => {
    signal.promptForPushNotificationsWithUserResponse();
  };

  const handleForegroundNotification = () => {
    signal.setNotificationWillShowInForegroundHandler((
      notificationReceivedEvent: NotificationReceivedEvent,
    ) => {
      const notification = notificationReceivedEvent.getNotification();
      notificationReceivedEvent.complete(notification);
    });
  };

  const handleNotificationOpened = () => {
    signal.setNotificationOpenedHandler();
  };

  const connectSignal = async () => {
    await signal.setLogLevel(6, 0);
    await signal.setAppId(env.NOTIFICATION_APP_ID);
    if (user.id) {
      await signal.setExternalUserId(user.id);
    }
    if (user.id) {
      await signal.sendTag('email', user.email);
    }
    await promptNotification();
    await handleForegroundNotification();
    await handleNotificationOpened();
  };

  const handleConnect = () => {
    if (signal && user) {
      connectSignal();
    }
  };

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    handleConnect();
  }, [user?.id, appState]);
};
