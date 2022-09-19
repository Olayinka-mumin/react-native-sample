import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';
import { RootState } from '@config/store';
import Welcome from '@modules/auth/screens/Welcome';

const Stack = createNativeStackNavigator();
enableScreens();

const Route = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Sink' : 'Chat'}>
        <Stack.Screen
          name="Sink"
          component={Welcome}
          options={{ title: 'Kitchen Sink' }}
        />
        <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
