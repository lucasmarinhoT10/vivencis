import * as yup from 'yup';

export const schemaChangePassword = yup.object().shape({
  email: yup.string(),
  currentPassword: yup.string(),
  newPassword: yup
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .required('Campo obrigatório'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'As senhas não conferem')
    .required('Campo obrigatório'),
});
