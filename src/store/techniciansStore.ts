import { create } from 'zustand'

interface TechStoreState {
  technicians: any[] | null
  loading: boolean
  setTechnicians: (technicians: any | null) => void
  setLoading: (loading: boolean) => void
}

const useTechniciansStore = create<TechStoreState>((set) => ({
  technicians: null,
  loading: false,
  setTechnicians: (technicians) => set({ technicians }),
  setLoading: (loading) => set({ loading }),
}))

export default useTechniciansStore
