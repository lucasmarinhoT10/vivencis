import { create } from 'zustand';

interface ResgisterStoreState {
  register: any | null;
  loading: boolean;
  setRegister: (register: any | null) => void;
  setLoading: (loading: boolean) => void;
}

const useRegisterStore = create<ResgisterStoreState>((set) => ({
  register: null,
  loading: false,
  setRegister: (register) => set({ register }),
  setLoading: (loading) => set({ loading }),
}));

export default useRegisterStore;
