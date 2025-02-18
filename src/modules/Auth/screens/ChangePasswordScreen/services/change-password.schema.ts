import * as yup from 'yup';

export const schemaChangePassword = yup.object().shape({
  email: yup.string(),
  currentPassword: yup.string(),
  newPassword: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .required('Campo obrigatório'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'As senhas não conferem')
    .required('Campo obrigatório'),
});
