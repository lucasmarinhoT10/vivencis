import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from '../models/Auth';
import { getUserProfile } from '../services/authService';

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (token: string) => {
    AsyncStorage.setItem('authToken', token)
      .then(() => {
        set({ isLoggedIn: true, token });
      })
      .catch((error) => {
        console.error('Erro ao salvar o token:', error);
      });
  },

  logout: () => {
    AsyncStorage.removeItem('authToken')
      .then(() => {
        set({ isLoggedIn: false, token: null, user: null });
      })
      .catch((error) => {
        console.error('Erro ao remover o token:', error);
      });
  },

  checkLoginStatus: () => {
    AsyncStorage.getItem('authToken')
      .then((token) => {
        if (token) {
          getUserProfile()
            .then(async (user) => {
              if (user.active) {
                set({ isLoggedIn: true, token, user });
              } else {
                set({ isLoggedIn: false, token: null, user: null });
                await AsyncStorage.removeItem('authToken');
              }
            })
            .catch((error) => {
              console.error('Erro ao verificar o usuário logado:', error);
              set({ isLoggedIn: false, token: null, user: null });
            });
        } else {
          set({ isLoggedIn: false, token: null, user: null });
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar o token:', error);
      });
  },
}));

export default useAuthStore;
