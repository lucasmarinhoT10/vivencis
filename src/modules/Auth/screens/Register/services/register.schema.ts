import * as yup from 'yup';

export const schemaStepOne = yup.object().shape({
  razao_social: yup.string().required('Razão social é obrigatória'),
  email: yup
    .string()
    .email('O email deve ser válido')
    .required('O email é obrigatório'),
  email_confirmation: yup
    .string()
    .email('O email deve ser válido')
    .oneOf([yup.ref('email')], 'Os emails devem coincidir')
    .required('A confirmação do email é obrigatória'),
    ie: yup
    .string()
    .required('inscrição estadual é obrigatória'),
    im: yup
    .string()
    .required('inscrição municipal é obrigatória'),
    cnae01: yup
    .string()
    .required('CNAE 01 é obrigatória'),
    cnae02: yup
    .string()
    .required('CNAE 02 é obrigatória'),
    nome_fantasia: yup
    .string()
    .required('Nome fantasia é obrigatório'),
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'Formato de CNPJ inválido')
    .required('O CNPJ é obrigatório'),
  responsavel_nome: yup.string().required('O nome do responsável é obrigatório'),
  responsavel_cpf: yup
    .string()
    .required('O CPF do responsável é obrigatório'),
  telefone_contato: yup
    .string()
    .matches(
      /^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/,
      'Formato de telefone inválido. Exemplo: (11) 91234-5678'
    )
    .required('O telefone para contato é obrigatório'),
});

export const schemaStepTwo = yup.object().shape({
  cep: yup
    .string()
    .required('O CEP é obrigatório'),
  logradouro: yup.string().required('O Logradouro é obrigatório'),
  estado: yup.string().required('O estado é obrigatório'),
  cidade: yup.string().required('A cidade é obrigatório'),
  numero: yup
    .string()
    .required('O número é obrigatório'),
  complemento: yup.string(), // Campo opcional
  bairro: yup.string().required('O bairro é obrigatório'),
  id_cidade: yup
    .number()
    .typeError('O ID da cidade deve ser um número')
    .required('O ID da cidade é obrigatório'),
});
export const schemaStepThree = yup.object().shape({
  id_banco: yup
    .number()
    .typeError('O ID do banco deve ser um número')
    .required('O ID do banco é obrigatório'),
  tipo_conta: yup
    .string().required('O Tipo da conta é obrigatório'),
  titular_conta: yup
    .string().required('O Titular conta é obrigatório'),
  agencia: yup
    .string()
    .matches(/^\d+$/, 'A agência deve conter apenas dígitos')
    .required('A agência é obrigatória'),
  agencia_dv: yup
    .string()
    .matches(/^\d*$/, 'O dígito verificador da agência deve conter apenas dígitos').required('O Digito da Agencia é obrigatório'),
  conta: yup
    .string()
    .matches(/^\d+$/, 'A conta deve conter apenas dígitos')
    .required('A conta é obrigatória'),
  conta_dv: yup
    .string()
    .matches(/^\d*$/, 'O dígito verificador da conta deve conter apenas dígitos').required('O Digito da conta é obrigatório'),
  id_tipo_pix: yup
    .number()
    .typeError('O ID do tipo de PIX deve ser um número').required('O Tipo Pix é obrigatório'),
  chave_pix: yup
    .string()
    .required('A chave PIX é obrigatória'),
});
