import api from '@services/api';

interface RecoverPasswordParams {
  email: string;
  tokenTemp: string;
}

export async function recoverPassword({
  email,
  tokenTemp,
}: RecoverPasswordParams): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenTemp}`,
  };
  try {
    const { data } = await api.post(
      '/wfmb2bapp/usuarios/recupera_senhacp',
      {
        email,
      },
      { headers }
    );
    return data;
  } catch (error: any) {
    console.error('Erro ao recuperar senha:', error);
    return {
      success: false,
      message: error?.response?.data?.erro || 'Erro ao recuperar senha',
    };
  }
}
