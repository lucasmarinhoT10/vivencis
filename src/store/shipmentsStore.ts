import { create } from 'zustand'
import { ApiResponseShipments } from './Models/Shipments'

interface ShipmentsStoreState {
  shipments: ApiResponseShipments | null
  loading: boolean
  setShipments: (shipments: any | null) => void
  setLoading: (loading: boolean) => void
}

const useShipmentsStore = create<ShipmentsStoreState>((set) => ({
  shipments: null,
  loading: false,
  setShipments: (shipments) => set({ shipments }),
  setLoading: (loading) => set({ loading }),
}))

export default useShipmentsStore
