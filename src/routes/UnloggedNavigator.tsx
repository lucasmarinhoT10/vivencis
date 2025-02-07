import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from '@modules/Auth/screens/Initial';
import SignInScreen from '@modules/Auth/screens/SignIn';
import SignUpScreen from '@modules/Auth/screens/Register';
import RecoverScreen from '@modules/Auth/screens/Recover';

export function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Initial">
      <Stack.Screen
        name="Initial"
        component={InitialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recover"
        component={RecoverScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
