import { create } from 'zustand';

interface LocationStoreState {
  location: { latitude: number; longitude: number } | null;
  loading: boolean;
  setLocation: (
    location: { latitude: number; longitude: number } | null
  ) => void;
  setLoading: (loading: boolean) => void;
}

const useLocationStore = create<LocationStoreState>((set) => ({
  location: null,
  loading: false,
  setLocation: (location) => set({ location }),
  setLoading: (loading) => set({ loading }),
}));

export default useLocationStore;
