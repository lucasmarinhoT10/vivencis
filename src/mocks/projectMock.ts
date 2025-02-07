const projectMock = [
  {
    id: '1',
    title: 'Projeto exemplo',
    startDate: '25/09',
    endDate: '10/12',
    description:
      'Descrição exemplo do projeto. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    title: 'Projeto exemplo',
    startDate: '25/09',
    endDate: '10/12',
    description:
      'Descrição exemplo do projeto. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    title: 'Projeto exemplo',
    startDate: '25/09',
    endDate: '10/12',
    description:
      'Descrição exemplo do projeto. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '4',
    title: 'Projeto exemplo',
    startDate: '25/09',
    endDate: '10/12',
    description:
      'Descrição exemplo do projeto. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];
const detailsProjects = [
  {
    id: '1',
    header: {
      name: 'Nome do projeto',
    },
    items: [
      { label: 'Data de execução', value: '23/02/2024' },
      { label: 'Data final execução', value: '23/03/2024' },
      { label: 'Descrição', value: 'Uma breve descrição do projeto.' },
      {
        label: 'Valor total do projeto',
        value: 'R$0.000,00',
      },
    ],
  },
];
const projectDetailsMock = [
  {
    id: '1',
    header: {
      osNumber: 'OS 7298259',
    },
    items: [
      { label: 'Tipo', value: 'INSTALAÇÃO' },
      { label: 'Status', value: 'CORRIGIR INSTALAÇÃO' },
      { label: 'Estágio', value: 'ANDAMENTO' },
      { label: 'Cliente', value: 'MARCILENE TAVARES DE MIRANDA' },
      { label: 'Bairro', value: 'ZONA RURAL' },
      { label: 'Cidade-UF', value: 'Araguaína-TO' },
      { label: 'Data Vencimento', value: '28/09/2024' },
      { label: 'Data Agendada', value: '25/09/2024' },
      { label: 'Técnico', value: 'TÉCNICO EXEMPLO' },
    ],
  },
  {
    id: '2',
    header: {
      osNumber: 'OS 7298259',
    },
    items: [
      { label: 'Tipo', value: 'INSTALAÇÃO' },
      { label: 'Status', value: 'CORRIGIR INSTALAÇÃO' },
      { label: 'Estágio', value: 'ANDAMENTO' },
      { label: 'Cliente', value: 'MARCILENE TAVARES DE MIRANDA' },
      { label: 'Bairro', value: 'ZONA RURAL' },
      { label: 'Cidade-UF', value: 'Araguaína-TO' },
      { label: 'Data Vencimento', value: '28/09/2024' },
      { label: 'Data Agendada', value: '25/09/2024' },
      { label: 'Técnico', value: 'TÉCNICO EXEMPLO' },
    ],
  },
];

const projectDetailsOsMock = [
  {
    id: '1',
    title: 'Informações básicas',
    items: [
      { label: 'Num. OS', value: '7298259' },
      { label: 'Estágio', value: 'ANDAMENTO' },
      { label: 'Status', value: 'CORRIGIR INSTALAÇÃO' },
      { label: 'Data Agendamento', value: '23/07/2024' },
      { label: 'Período', value: 'MANHÃ' },
      { label: 'Tipo', value: 'Instalação' },
      { label: 'Origem', value: 'NORMAL' },
    ],
  },
  {
    id: '2',
    title: 'Dados do cliente',
    items: [
      { label: 'Cliente', value: 'MARCELENE TAVARES DE MIRANDA' },
      { label: 'Data Nascimento', value: '-' },
      { label: 'CEP', value: '72930-290' },
      { label: 'Endereço', value: 'RUA ALTO BONITO / POVOADO PONTES' },
      { label: 'Número', value: '12' },
      { label: 'Bairro', value: 'ZONA RURAL' },
      { label: 'Telefone', value: '(63) 992040-4792' },
      { label: 'Celular', value: '-' },
      { label: 'Email', value: '-' },
      {
        label: 'Ponto de referencia',
        value:
          'PRÓXIMO AO POSTINHO DE SAÚDE / TELEFONE. REFERÊNCIA: PRÓXIMO À ESCOLA MUNICIPAL ANTÔNIO PEDRO.',
      },
    ],
  },
];
export {
  projectMock,
  projectDetailsMock,
  detailsProjects,
  projectDetailsOsMock,
};
