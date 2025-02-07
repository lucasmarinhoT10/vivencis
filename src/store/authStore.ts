import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

type IUseAuthStore = {
  token: string | null
  tokenTemp: string | null
  authenticateUser: (token: string) => Promise<void>
  authenticateTokenTemp: (tokenTemp: string) => Promise<void>
  loadToken: () => Promise<void>
  loadTokenTemp: () => Promise<void>
  logoutUser: () => Promise<void>
}

const useAuthStore = create<IUseAuthStore>((set) => ({
  token: '',
  tokenTemp: '',
  authenticateUser: async (token: string) => {
    await AsyncStorage.setItem('userToken', token)
    set(() => ({ token }))
  },
  authenticateTokenTemp: async (tokenTemp: string) => {
    await AsyncStorage.setItem('tokenTemp', tokenTemp)
    set(() => ({ tokenTemp }))
  },
  loadToken: async () => {
    const token = await AsyncStorage.getItem('userToken')
    if (token) {
      set(() => ({ token }))
    }
  },
  loadTokenTemp: async () => {
    const tokenTemp = await AsyncStorage.getItem('tokenTemp')
    if (tokenTemp) {
      set(() => ({ tokenTemp }))
    }
  },
  logoutUser: async () => {
    await AsyncStorage.removeItem('userToken')
    set(() => ({ token: null }))
  },
}))

export default useAuthStore
