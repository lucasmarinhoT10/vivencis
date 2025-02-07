export interface ResponseUserData {
  usuario: UsuarioData;
  perfil: string[];
  projetos: Projeto[];
  token: string;
}

export interface UsuarioData {
  id: number;
  nome: string;
  entidade: string;
  id_entidade: number;
  nome_entidade: string;
  email: string;
  id_tecnico: number;
}

interface Projeto {
  id_projeto: number;
  descricao: string;
}
