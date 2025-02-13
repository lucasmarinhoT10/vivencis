import { FilterCriteria } from "@components/TechFilterModal";
import api from "@services/api";

interface TechDataProps{
  setTechnicians: (project: any) => void
  setPagination: (pagination: any) => void
  setLoading: (loading: boolean) => void
  id_parceiro: any
  filterCriteria: FilterCriteria
  perPage?: number
  currentPage?: number
}
interface TechAddProps{
  payload:any
  setLoading: (loading: boolean) => void
  id_parceiro: any
}
interface TechEditProps{
  payload:any
  setLoading: (loading: boolean) => void
  id_tecnico: any
}
export async function fetchTechnicians({id_parceiro,  setTechnicians, setLoading, filterCriteria, perPage, setPagination,  currentPage}: TechDataProps): Promise<any> {

  const params = new URLSearchParams();
  if (filterCriteria.cpf) params.append('filter_cpf', `${filterCriteria.cpf}`);
  if (filterCriteria.nome) params.append('filter_nome', `${filterCriteria.nome}`);
  if (filterCriteria.status) params.append('filter_status', `${filterCriteria.status}`);

  try {
    setLoading(true)
    const { data } = await api.get<any>(`/wfmb2bapp/v2/parceiros/tecnicos/${id_parceiro}?${params.toString()}&reg_por_pg=${perPage}&pg=${currentPage}`);
    if(data){
      setTechnicians(data.tecnicos);
      setPagination(data)
      setLoading(false)
    }else{
      setTechnicians([])
      setLoading(false)
    }
    } catch (error) {
    setLoading(false)
    console.error('projects error', error);
  }
}
export async function addNewTechnician({id_parceiro, setLoading, payload}: TechAddProps): Promise<any> {
  try {
    setLoading(true)
    const { data } = await api.post<any>(`/wfmb2bapp/v2/parceiros/tecnicos/${id_parceiro}`, {...payload});
    return {...data, success: true}
  } catch (error: any) {
    setLoading(false)
    return {...error?.response?.data,  success: false}  }
}
export async function editTechnician({id_tecnico, setLoading, payload}: TechEditProps): Promise<any> {
  try {
    setLoading(true)
    const { data } = await api.put<any>(`/wfmb2bapp/v2/parceiros/tecnicos/${id_tecnico}`, {...payload});
    return {...data, success: true}
  } catch (error: any) {
    setLoading(false)
    return {...error?.response?.data,  success: false}  }
}