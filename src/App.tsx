if (__DEV__) {
  require('../ReactotronConfig');
}
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import LoggedNavigator from '@routes/LoggedNavigator';
import Toast from 'react-native-toast-message';
import useLocationStore from './store/useLocationStore';
import useAuthStore from './store/authStore';
import useUserStore from './store/userStore';
import { getTokenTemp } from '@modules/Auth/screens/Register/services/register.services';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { setLocation, setLoading } = useLocationStore();
  const { token, loadToken, authenticateTokenTemp, loadTokenTemp } =
    useAuthStore();
  const { loadUser } = useUserStore();

  useEffect(() => {
    async function getToken() {
      await loadToken();
      await loadUser();
      await loadTokenTemp();
      await getTokenTemp(authenticateTokenTemp);
    }
    getToken();
  }, []);
  useEffect(() => {
    const prepareApp = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão para acessar a localização negada');
        setLocation(null);
      } else {
        setLoading(true);
        // Obtém a localização atual
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLoading(false);
      }
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <LoggedNavigator />
      <Toast />
    </NavigationContainer>
  );
}
