import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import Line from '@components/Line';
import Input from '@components/Input';
import Button from '@components/Button';
import { Masks } from 'react-native-mask-input';

const schema = yup.object().shape({
  nome: yup.string().required('Nome completo é obrigatório'),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(
      /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
      'CPF inválido. Exemplo: 000.000.000-00'
    ),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email')], 'Emails não conferem')
    .required('Confirmação de email é obrigatória'),
});

type FormData = {
  nome: string;
  cpf: string;
  email: string;
  confirmEmail: string;
};

interface StepOneProps {
  setDataRegister: (data: any) => void;
  dataRegister: any;
  step: number;
  setStep: (step: number) => void;
}

const StepOne: React.FC<StepOneProps> = ({
  setDataRegister,
  dataRegister,
  step,
  setStep,
}) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      nome: dataRegister?.nome || '',
      cpf: dataRegister?.cpf || '',
      email: dataRegister?.email || '',
      confirmEmail: dataRegister?.confirmEmail || '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormData) => {
    setDataRegister({ ...dataRegister, ...data });
    setStep(step + 1);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.content}>
        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="500"
          style={styles.title}
        >
          1. Dados cadastrais
        </Typograph>
        <Spacer size="medium" />
        <Line progress={0.3} height={8} />
        <Spacer size="medium" />

        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          Nome completo
        </Typograph>
        <Input control={control} name="nome" error={errors.nome?.message} />
        <Spacer size="medium" />

        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          CPF
        </Typograph>
        <Input
          control={control}
          name="cpf"
          mask={Masks.BRL_CPF}
          error={errors.cpf?.message}
        />
        <Spacer size="medium" />

        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          Email
        </Typograph>
        <Input control={control} name="email" error={errors.email?.message} />
        <Spacer size="medium" />

        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          Confirmar email
        </Typograph>
        <Input
          control={control}
          name="confirmEmail"
          error={errors.confirmEmail?.message}
        />
        <Spacer size="large" />

        <Button
          text="Continuar"
          onPress={handleSubmit(onSubmit)}
          style={{ height: 44 }}
        />
      </View>
    </FormProvider>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    fontSize: 16,
  },
});
