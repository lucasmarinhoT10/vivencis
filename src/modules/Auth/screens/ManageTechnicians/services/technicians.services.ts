import api from "@services/api";

interface TechDataProps{
  setTechnicians: (project: any) => void
  setLoading: (loading: boolean) => void
  id_parceiro: any
}
interface TechAddProps{
  payload:any
  setLoading: (loading: boolean) => void
  id_parceiro: any
}
export async function fetchTechnicians({id_parceiro,  setTechnicians, setLoading}: TechDataProps): Promise<any> {
  try {
    setLoading(true)
    const { data } = await api.get<any>(`/wfmb2bapp/v2/parceiros/tecnicos/${id_parceiro}`);
    if(data){
      setTechnicians(data.tecnicos);
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