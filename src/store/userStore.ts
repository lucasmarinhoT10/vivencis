import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsuarioData } from './Models/User';

interface UserStoreState {
  user: UsuarioData | null;
  loading: boolean;
  setUser: (user: UsuarioData | null) => void;
  setLoading: (loading: boolean) => void;
  loadUser: () => Promise<void>;
  saveUser: (user: UsuarioData) => Promise<void>;
  removeUser: () => Promise<void>;
}

const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => {
    set({ user });
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  },
  setLoading: (loading) => set({ loading }),
  loadUser: async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }
    } catch (error) {
      console.error('Erro ao carregar o usuário', error);
    }
  },
  saveUser: async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user });
    } catch (error) {
      console.error('Erro ao salvar o usuário', error);
    }
  },
  removeUser: async () => {
    try {
      await AsyncStorage.removeItem('user');
      set({ user: null });
    } catch (error) {
      console.error('Erro ao remover o usuário', error);
    }
  },
}));

export default useUserStore;
