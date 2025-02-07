export interface ProjectData {
  id_projeto: 1,
  nome_projeto: string,
  cidade:string,
  uf: string
  data_execucao: string,
  data_limite_execucao: string,
  descricao_projeto: string,
  icone_projeto: any
}

export interface responseProjectsData{
  projetos: ProjectData[]
}
