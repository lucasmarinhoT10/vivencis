import api from '@services/api';
import axios from 'axios';
import { API_BASE_URL } from '@env';

export async function login({
  email,
  senha,
  id_celular,
  modelo_celular,
  versao_app,
  setUser,
  authenticateUser,
  setLoading,
  rememberMe,
  setRegister,
}: any): Promise<any> {
  try {
    setLoading(true);
    const { data } = await api.post<any>('/wfmb2bapp/usuarios/logincp', {
      email,
      senha,
      id_celular,
      modelo_celular,
      versao_app,
    });
    if (data) {
      const response = await getRegistro({
        id_parceiro: data?.usuario?.id_entidade,
        token: data?.token,
      });
      if (response?.status_analise === 'LIBERADO') {
        setLoading(false);
        await authenticateUser(data?.token, rememberMe);
        await setUser(data?.usuario);
        await setRegister(response);
        return { success: true, data: data };
      } else if (response?.status_analise === 'EM ANALISE') {
        await authenticateUser(data?.token, rememberMe);
        await setUser(data?.usuario);
        setLoading(false);
        return {
          success: false,
          message: 'Seu cadastro ainda está em analise!',
          status: response?.status_analise,
          data: response,
        };
      } else if (response?.status_analise === 'REPROVADO') {
        setLoading(false);
        return {
          success: false,
          message: 'Seu cadastro foi reprovado, tente novamente!',
          status: response?.status_analise,
          data: response,
        };
      }
      setLoading(false);
    }

    setLoading(false);
  } catch (error: any) {
    if (error?.response?.data.erro === 'Token inválido ou expirado!') {
      setLoading(false);
      return { success: false, message: 'ResetToken' };
    } else {
      setLoading(false);
      return { success: false, message: 'Erro ao realizar login' };
    }
  }
}

export async function getStatus({ id_parceiro, token }: any): Promise<any> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const { data } = token
      ? await axios.get<any>(
          `${API_BASE_URL}/wfmb2bapp/v2/parceiros/status/${id_parceiro}`,
          { headers }
        )
      : await api.get<any>(
          `${API_BASE_URL}/wfmb2bapp/v2/parceiros/status/${id_parceiro}`
        );

    return data;
  } catch (error) {
    console.error('erro ao buscar status', error);
    return { success: false, message: 'Erro ao realizar login' };
  }
}
export async function getRegistro({ id_parceiro, token }: any): Promise<any> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const { data } = token
      ? await axios.get<any>(
          `${API_BASE_URL}/wfmb2bapp/v2/parceiros/parceiro/${id_parceiro}`,
          { headers }
        )
      : await api.get<any>(
          `${API_BASE_URL}/wfmb2bapp/v2/parceiros/parceiro/${id_parceiro}`
        );
    return data;
  } catch (error) {
    console.error('erro ao buscar registro', error);
    return { success: false, message: 'Erro ao realizar login' };
  }
}
