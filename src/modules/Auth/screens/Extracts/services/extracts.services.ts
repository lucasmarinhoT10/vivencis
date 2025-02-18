import api from '@services/api';
import {  responseProjectsData } from 'src/store/Models/Project';

interface ProjectDetailProps {
  id_project: number;
  setProject: (project: any) => void;
  setLoading: (loading: boolean) => void;
}
interface ExtractsProps {
  id_project?: number;
  id_parceiro?: number;
  page: number;
  setExtracts: (extracts: any) => void;
  setLoading: (loading: boolean) => void;
}

export async function fetchProjectDetail({
  id_project,
  setProject,
  setLoading,
}: ProjectDetailProps): Promise<any> {
  try {
    setLoading(true);
    const { data } = await api.get<responseProjectsData>(
      `/wfmb2bapp/v2/projetos/detalhes/${id_project}`
    );

    if (data) {
      setProject(data?.projetos ? data.projetos : data);
      setLoading(false);
    } else {
      setProject({});
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.error('projects error', error);
  }
}
export async function fetchExtracts({
  id_project,
  id_parceiro,
  page,
  setExtracts,
  setLoading,
}: ExtractsProps): Promise<any> {
  try {
    setLoading(true);
    const { data } = await api.get<any>(
      `/wfmb2bapp/v2/parceiros/extratos/${id_parceiro}`
    );
    if (data) {
      setExtracts(data);
      setLoading(false);
    } else {
      setExtracts({});
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.error('projects error', error);
  }
}
