export interface OrdersResponse{
  paginas:number
pg:number
registros:number
offset:number
ordens: OrdersProps[]
}

export interface PaginationOrders{
  paginas:number
  pg:number
  registros:number
  offset:number
}
export interface OrdersProps{
  id_os:number
  numero_os:number
  id_projeto:number
  nome_projeto:string
  id_status:number
  estagio:string
  status:string
  tipo:string
  periodo:string
  dta_agendamento:string
  status_prazo:string
  id_tecnico:number
  nome_tecnico:string
  bairro:string
  cidade:string
  uf:string
}