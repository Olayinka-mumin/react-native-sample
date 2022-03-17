import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { userInterface } from '@modules/auth/store/reducer';
import Welcome from '@modules/auth/screen/welcome';
const Stack = createNativeStackNavigator();
enableScreens();

interface Props {
  user?: userInterface;
}
const Route = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.user ? 'Sink' : 'Chat'}>
        <Stack.Screen
          name={'Sink'}
          component={Welcome}
          options={{ title: 'SendErrand Kitchen Sink' }}
        />
        <Stack.Screen name={'Chat'} component={Welcome} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
