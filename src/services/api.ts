import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if(token === null){
      config.headers.Authkey = "Nc7GyueeNLUfLC7RRSpFUiiSQ";
      config.headers.Credential = "m86PPZxWZGwpcck";
    }else{
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Erro de autenticação, redirecionando para login');
    }
    return Promise.reject(error);
  }
);

export default api;
