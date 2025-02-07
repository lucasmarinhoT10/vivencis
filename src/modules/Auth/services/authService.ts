import api from '@services/api';
import { SignInResponse, UserResponse } from '../models/Auth';

export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  try {
    const response = await api.post<SignInResponse>('/sessions', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>('/me');
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar o perfil:', error);
    throw error;
  }
};
