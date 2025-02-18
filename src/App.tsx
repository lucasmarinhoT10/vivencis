if (__DEV__) {
  require('../ReactotronConfig');
}
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNavigator from '@routes/LoggedNavigator';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';

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
import useUserStore from './store/userStore';
import { getTokenTemp } from '@modules/Auth/screens/Register/services/register.services';
import useAuthStore from './store/authStore';
import useLocationStore from './store/useLocationStore';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { loadUser } = useUserStore();
  const { setLocation } = useLocationStore();
  const { token, authenticateTokenTemp, loadTokenTemp, loadToken } =
    useAuthStore();
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
  useEffect(() => {
    async function getToken() {
      await loadToken();
      await loadUser();
      if (token === '' || token === null) {
        await loadTokenTemp();
        await getTokenTemp(authenticateTokenTemp);
      }
    }
    getToken();
  }, []);

  useEffect(() => {
    async function fetchLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert(
          'Permissão para acessar a localização é necessária para o funcionamento do app.'
        );
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
    }

    fetchLocation();
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
