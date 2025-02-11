import api from "@services/api";
import { ApiResponseShipments } from "src/store/Models/Shipments";
import { InputData } from '../../../../../components/InputData/index';


interface ShipDataProps{
  id_projeto?: number
  setShipments: (project: any) => void
  setLoading: (loading: boolean) => void
  id_parceiro: any
  status?: string
  dta_inicio?: string
  dta_fim?: string
  perPage: number
  currentPage?: number
}
interface ShipAcceptedProps{
  id_remessa?: number
  id_user?: number
  setLoading: (loading: boolean) => void

}
export async function fetchShipments({
  id_parceiro,
  status,
  id_projeto,
  dta_inicio,
  dta_fim,
  setShipments,
  setLoading,
  perPage, 
  currentPage
}: ShipDataProps): Promise<any> {
  try {
    setLoading(true);
    
    const params = new URLSearchParams();
    if (id_projeto) params.append('id_projeto', `${id_projeto}`);
    if (dta_inicio) params.append('dta_inicio', dta_inicio);
    if (dta_fim) params.append('dta_fim', dta_fim);
    if (status) params.append('status', status);
    
    const { data } = await api.get<ApiResponseShipments>(
      `/wfmb2bapp/v2/parceiros/estoque/remessas/${id_parceiro}?${params.toString()}&reg_por_pg=${perPage}&pg=${currentPage}`
    );
    
    setShipments(data ?? []);
  } catch (error) {
    console.error('projects error', error);
    setShipments([]);
  } finally {
    setLoading(false);
  }
}

export async function acceptedRemessa({id_remessa, id_user, setLoading}: ShipAcceptedProps): Promise<any> {
  try {
    setLoading(true)
    const { data } = await api.put<ApiResponseShipments>(`/wfmb2bapp/v2/parceiros/estoque/remessas/${id_remessa}/${id_user}`);
    return {success: true} 
    } catch (error: any) {
      if(error?.response){
        setLoading(false)
        return error?.response?.data
      } else{
        setLoading(false)
        console.error('projects error', error);
      }
  }
}