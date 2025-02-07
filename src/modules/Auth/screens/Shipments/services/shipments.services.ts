import api from "@services/api";
import { ApiResponseShipments } from "src/store/Models/Shipments";


interface ShipDataProps{
  id_project?: number
  setShipments: (project: any) => void
  setLoading: (loading: boolean) => void
  id_parceiro: any
  status?: string
  dta_inicio?: string
  dta_fim?: string
}
export async function fetchShipments({id_project,id_parceiro, status,dta_inicio, dta_fim, setShipments, setLoading}: ShipDataProps): Promise<any> {
  try {
    setLoading(true)
    const { data } = await api.get<ApiResponseShipments>(`/wfmb2bapp/v2/parceiros/estoque/remessas/${id_parceiro}`);
    if(data){
      setShipments(data);
      setLoading(false)
    }else{
      setShipments([])
      setLoading(false)
    }
    } catch (error) {
    setLoading(false)
    console.error('projects error', error);
  }
}