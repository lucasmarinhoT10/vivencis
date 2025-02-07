import { create } from 'zustand'
import { OrdersProps } from './Models/Orders'

interface OrdersStoreState {
  orders: OrdersProps[] | null
  loading: boolean
  setOrders: (projects: any | null) => void
  setLoading: (loading: boolean) => void
}

const useOrdersStore = create<OrdersStoreState>((set) => ({
  orders: null,
  loading: false,
  setOrders: (orders) => set({ orders }),
  setLoading: (loading) => set({ loading }),
}))

export default useOrdersStore
