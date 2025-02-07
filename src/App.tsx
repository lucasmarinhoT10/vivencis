import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNavigator from '@routes/LoggedNavigator';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Carrega as fontes Poppins
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    async function prepare() {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <LoggedNavigator />
      <Toast />
    </NavigationContainer>
  );
}
