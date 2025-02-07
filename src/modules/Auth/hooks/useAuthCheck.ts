import { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';

export const useAuthCheck = () => {
  const { checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, []);
};
