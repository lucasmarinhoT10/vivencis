import api from '@services/api';
import { ProjectData, responseProjectsData } from 'src/store/Models/Project';
import { PaginationOrders } from 'src/store/Models/Orders';

interface ProjectProps {
  UF?: string;
  cidade?: string;
  id_parceiro?: number;
  setProjects: (projects: ProjectData[]) => void;
  setLoading: (loading: boolean) => void;
  filters?: any;
}
interface OrderProps {
  id_parceiro?: number;
  id_tecnico?: number;
  perPage?: number;
  currentPage?: number;
  filter?: any
  setOrders: (projects: ProjectData[]) => void;
  setPaginationOrders: (ordersData: PaginationOrders) => void;
  setLoading: (loading: boolean) => void;
}
interface CloseOrdersProps {
  id_parceiro?: number;
  setLoading: (loading: boolean) => void;
  payload: any;
}
interface ProjectDetailProps {
  id_project: number;
  setProject: (project: any) => void;
  setLoading: (loading: boolean) => void;
}
interface ProductsProps {
  id_project: number;
  id_os: number;
  setProducts: (products: any) => void;
  setRoles: (products: any) => void;
  setLoading: (loading: boolean) => void;
}
interface SubscribeProps {
  id_project: number;
  payload: any
  setLoading: (loading: boolean) => void;
}

export async function fetchProjects({
  UF = '',
  cidade = '',
  id_parceiro,
  setProjects,
  setLoading,
  filters,
}: ProjectProps): Promise<any> {
  try {
    setLoading(true);
    let url = `/wfmb2bapp/v2/projetos/lista?uf=${encodeURIComponent(UF)}&cidade=${encodeURIComponent(cidade)}&id_parceiro=${id_parceiro}`;

    if (filters) {
      if (filters.status) {
        url += `&filter_status=${encodeURIComponent(filters.status)}`;
      }
      if (filters.tipo) {
        url += `&filter_tipo=${encodeURIComponent(filters.tipo)}`;
      }
      if (filters.tecnico) {
        url += `&filter_tecnico=${encodeURIComponent(filters.tecnico)}`;
      }
      if (filters.data) {
        url += `&filter_data_agendamento=${encodeURIComponent(filters.data)}`;
      }
      if (filters.projeto) {
        url += `&filter_projeto=${encodeURIComponent(filters.projeto)}`;
      }
    }

    const { data } = await api.get<responseProjectsData>(url);
    if (data) {
      setProjects(data.projetos);
    } else {
      setProjects([]);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('Erro ao buscar projetos', error);
  }
}

export async function fetchOrders({
  id_tecnico,
  id_parceiro,
  setOrders,
  setLoading,
  perPage,
  currentPage,
  setPaginationOrders,
  filter
}: OrderProps): Promise<any> {
  try {
    setLoading(true);
    let url = await `/wfmb2bapp/v2/parceiros/ordens/${id_parceiro}/${id_tecnico}?reg_por_pg=${perPage}&pg=${currentPage}`
    
    if (filter) {
      if (filter?.grupo_status) {
        url += `&filter_grupostatus=${encodeURIComponent(filter.grupo_status)}`;
      }
      if (filter.projeto) {
        url += `&filter_projeto=${encodeURIComponent(filter.projeto)}`;
      }
    }
    const { data } = await  api.get<any>(url)
    if (data) {
      setOrders(data.ordens);
      setPaginationOrders(data)
      setLoading(false);
    } else {
      setOrders([]);
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.error('projects error', error);
  }
}
export async function fetchCloseOS({
  id_parceiro,
  setLoading,
  payload,
}: CloseOrdersProps): Promise<any> {
  try {
    setLoading(true);
    const response = await api.post<any>(
      `/wfmb2bapp/v2/parceiros/os/fechamento/${id_parceiro}`,
      payload
    );

    setLoading(false);
    return response.data;
  } catch (error: any) {
    setLoading(false);

    if (error.response) {
      return error.response.data;
    } else {
      console.error('Erro inesperado:', error);
      return null;
    }
  }
}

export async function fetchEvidenciasOS({
  id_parceiro,
  setLoading,
  payload,
}: CloseOrdersProps): Promise<any> {
  try {
    setLoading(true);
    const data = await api.post<any>(
      `/wfmb2bapp/v2/parceiros/os/fechamento/evidencias/${id_parceiro}`,
      payload
    );

    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('projects error', error);
  }
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
export async function fetchProducts({
  id_project,
  id_os,
  setProducts,
  setLoading,
  setRoles,
}: ProductsProps): Promise<any> {
  try {
    setLoading(true);
    const { data } = await api.get<any>(
      `/wfmb2bapp/v2/parceiros/os/projeto/${id_project}/${id_os}`
    );
    if (data) {
      setProducts(data.grupos);
      setRoles(data);
      setLoading(false);
    } else {
      setProducts({});
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.error('projects error', error);
  }
}
export async function subscribeProject({
  id_project,
  setLoading,
  payload
}: SubscribeProps): Promise<any> {
  try {
    setLoading(true);
    const { data } = await api.post<any>(`/wfmb2bapp/v2/projetos/inscricao/${id_project}`, payload);
    return data
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error('Erro inesperado:', error);
      return null;
    }
  }
}
