import { useEffect, useState } from 'react';
import Echo from 'laravel-echo/dist/echo';
import { AppState, AppStateStatus } from 'react-native';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { env } from '@config/constants';
import { RootState, useAppDispatch } from '@config/store';
import { queryOne } from '@modules/auth/store/action';

export default () => {
  const dispatch = useAppDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const [appState, setAppState] = useState(AppState.currentState);
  const [echo, setEcho] = useState<Echo>();

  const connectSocket = async () => {
    echo?.private(`user.${user?.id}`).listen(
      'Changes',
      () => {
        dispatch(queryOne());
      },
    );
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => (
    setAppState(nextAppState)
  );

  const handleConnect = () => {
    if (user) {
      connectSocket();
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

  useEffect(() => {
    if (user?.token) {
      setEcho(
        new Echo({
          broadcaster: 'socket.io',
          host: env.SOCKET_BASE_URL,
          client: io,
          auth: {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        }),
      );
    }
  }, [user?.token]);
};
