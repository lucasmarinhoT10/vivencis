import api from '@services/api';

interface ChangePasswordParams {
  email: string;
  senha_old: string;
  senha_new: string;
  tokenTemp: string;
}

export async function changePassword({
  email,
  senha_old,
  senha_new,
  tokenTemp,
}: ChangePasswordParams): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenTemp}`,
  };
  try {
    const { data } = await api.post(
      '/wfmb2bapp/usuarios/troca_senhacp',
      {
        email,
        senha_old,
        senha_new,
      },
      { headers }
    );
    return data;
  } catch (error: any) {
    console.error('Erro ao trocar senha:', error);
    return {
      success: false,
      message: error?.response?.data?.erro || 'Erro ao trocar senha',
    };
  }
}
