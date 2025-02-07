
import * as yup from 'yup'

export const schemaStepOne = yup.object().shape({
  email: yup
    .string()
    .email("O email deve ser válido") 
    .required("O email é obrigatório"),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("O email deve ser válido") 
    .required("O email é obrigatório"),
  pass: yup
    .string()
    .required("Senha é obrigatória")
    .min(3, "A senha deve ter pelo menos 8 caracteres"),
});

export const schemaLoginPatient = yup.object().shape({
  cpf: yup
    .string() 
    .required("O CPF é obrigatório"),
  pass: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export const schemaStepTwo = yup.object().shape({
  code: yup
    .string()
    .matches(/^\d{6}$/, "O código deve conter exatamente 6 dígitos")
    .required("O código é obrigatório"), 
});

export const schemaStepThree = yup.object().shape({
  passOne: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  passTwo: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("passOne")], "As senhas não são iguais")
    .min(8, "A confirmação de senha deve ter pelo menos 8 caracteres"),
});