import api from "@services/api";
import axios from "axios";
import { API_BASE_URL } from '@env';

export async function getTokenTemp(authenticateTokenTemp: any): Promise<any> {
  try {
    const {data} = await api.post<any>('/wfmb2bapp/usuarios/gettoken')
    await authenticateTokenTemp(data?.token)
   
  } catch (error) {
    console.error('token temp error', error);
    return { success: false, message: 'Erro ao realizar login' };
  }
}

export async function registerUser({ setLoading, payload, tokenTemp, isEdit}: any): Promise<any> {
  try {
    setLoading(true)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenTemp}`,
    }
    
    const {data} = isEdit ?  await axios.put<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/parceiro`,  {...payload},  {
      headers,
    }) : await axios.post<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/parceiro`,  {...payload},  {
      headers,
    });
    setLoading(false)
    return data;
  } catch (error: any) {
    setLoading(false);
    if (error.response) {
      return {...error.response.data, success: false};
    } else {
      console.error("Erro inesperado:", error);
      return {success: false}; 
    }
  }
}
export async function addVoucherUser({ setLoading, payload}: any): Promise<any> {
  try {
    setLoading(true)
    
    const {data} = await api.put<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/parceiro`,  {...payload})
    setLoading(false)
    return data;
  } catch (error: any) {
    setLoading(false);
    if (error.response) {
      return {...error.response.data, success: false};
    } else {
      console.error("Erro inesperado:", error);
      return {erro: 'Erro inesperado, verifique se seus dados estão corretos',success: false}; 
    }
  }
}
export async function getCNPJ({ setLoading, cnpj, tokenTemp}: any): Promise<any> {
  try {
    setLoading(true)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenTemp}`,
    }

    const {data} = await axios.get<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/cnpj?cnpj=${cnpj}`, {headers});
    setLoading(false)
    return data
  } catch (error) {
    console.error('login error', error);
    setLoading(false)
    return { success: false, message: 'Erro ao realizar login' };
  }
}
export async function getCEP({ setLoading, cep, tokenTemp}: any): Promise<any> {
  try {
    setLoading(true)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenTemp}`,
    }

    const {data} = await axios.get<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/endereco?cep=${cep}`, {headers});
    setLoading(false)
    return data
  } catch (error) {
    console.error('login error', error);
    setLoading(false)
    return { success: false, message: 'Erro ao realizar login' };
  }
}
export async function getBancos({ setLoading, setBancos, tokenTemp}: any): Promise<any> {
  try {
    setLoading(true)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenTemp}`,
    }

    const {data} = await axios.get<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/bancos`, {headers});
    setBancos(data)
    setLoading(false)
    return data
  } catch (error) {
    console.error('login error', error);
    setLoading(false)
    return { success: false, message: 'Erro ao realizar login' };
  }
}
export async function getAccounts({ setLoading, setAccounts, tokenTemp}: any): Promise<any> {
  try {
    setLoading(true)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenTemp}`,
    }

    const {data} = await axios.get<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/tipoconta`, {headers});
    setAccounts(data)
    setLoading(false)
    return data
  } catch (error) {
    console.error('login error', error);
    setLoading(false)
    return { success: false, message: 'Erro ao realizar login' };
  }
}
export async function getPixTipo({ setLoading, setPixTipos, tokenTemp}: any): Promise<any> {
  try {
    setLoading(true)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenTemp}`,
    }

    const {data} = await axios.get<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/tipopix`, {headers});
    setPixTipos(data)
    setLoading(false)
    return data
  } catch (error) {
    console.error('login error', error);
    setLoading(false)
    return { success: false, message: 'Erro ao realizar login' };
  }
}
export async function getDocumentosTipo({ setLoading, setDocsTipo, tokenTemp}: any): Promise<any> {
  try {
    setLoading(true)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenTemp}`,
    }

    const {data} = tokenTemp ? await axios.get<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/tipos_documento/parceiro`, {headers}) :  await api.get<any>(`${API_BASE_URL}/wfmb2bapp/v2/parceiros/tipos_documento/parceiro`, {headers}) 
    setDocsTipo(data)
    setLoading(false)
    return data
  } catch (error) {
    console.error('login error', error);
    setLoading(false)
    return { success: false, message: 'Erro ao realizar login' };
  }
}