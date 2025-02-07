interface Serial {
  sn: string;
}

interface Item {
  codigo: number;
  descricao: string;
  quantidade: number;
  seriais: Serial[];
  serializado: "S" | "N";
}

export interface RemessaProps {
  cidade: string;
  data: string;
  id_projeto: number;
  id_remessa: number;
  identificador: string;
  itens: Item[];
  projeto: string;
  status: string;
  uf: string;
}

export interface ApiResponseShipments {
  offset: number;
  paginas: number;
  pg: number;
  registros: number;
  remessas: RemessaProps[];
}