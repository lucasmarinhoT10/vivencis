import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Input from '@components/Input';
import Line from '@components/Line';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaStepOne } from '../../services/register.schema';
import { getCNPJ } from '../../services/register.services';
import { validateCNPJ } from '@utils/valideCNPJ';
import { Masks } from 'react-native-mask-input';
import useAuthStore from 'src/store/authStore';
import Button from '@components/Button';

interface PropsForm {
  razao_social?: string;
  email_confirmation?: string;
  email?: string;
  cnpj?: string;
  responsavel_nome?: string;
  responsavel_cpf?: string;
  telefone_contato?: string;
  ie?: string;
  im?: string;
  cnae01?: string;
  cnae02?: string;
  nome_fantasia?: string;
}

/**
 * Função que define a máscara para CNAE de forma dinâmica.
 * Se o usuário tiver digitado 5 ou mais dígitos (apenas números), o traço será adicionado.
 * Caso contrário, o traço não é incluído.
 */
const dynamicMaskCNAE = (value: string) => {
  // Remove todos os caracteres que não são dígitos
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 5) {
    return [/\d/, /\d/, '.', /\d/, /\d/, '-', /\d/];
  } else {
    return [/\d/, /\d/, '.', /\d/, /\d/];
  }
};

const StepOne = ({ setDataRegister, dataRegister, step, setStep }: any) => {
  const { tokenTemp } = useAuthStore();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = useForm<PropsForm>({
    resolver: yupResolver(schemaStepOne),
    mode: 'onChange',
    defaultValues: {
      razao_social: dataRegister?.razao_social ?? '',
      cnpj: dataRegister?.cnpj ?? '',
      responsavel_nome: dataRegister?.responsavel_nome ?? '',
      responsavel_cpf: dataRegister?.responsavel_cpf ?? '',
      telefone_contato: dataRegister?.telefone_contato ?? '',
      email: dataRegister?.email ?? '',
      email_confirmation: dataRegister?.email_confirmation ?? '',
      ie: dataRegister?.ie ?? '',
      im: dataRegister?.im ?? '',
      cnae01: dataRegister?.cnae01 ?? '',
      cnae02: dataRegister?.cnae02 ?? '',
      nome_fantasia: dataRegister?.nome_fantasia ?? '',
    },
  });

  const onSubmit = async (data: PropsForm) => {
    setDataRegister((prevData: any) => ({
      ...(prevData || {}),
      ...data,
      // Preserva o endereço, se existir
      endereco: prevData?.endereco || {},
    }));

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const fetchCNPJ = async (cnpj: string) => {
    if (!validateCNPJ(cnpj)) return;
    const data = await getCNPJ({ cnpj, setLoading: () => {}, tokenTemp });
    if (data) {
      if (data.razao_social) {
        setValue('razao_social', data.razao_social);
      }
      if (data.telefone) {
        setValue('telefone_contato', data.telefone);
      }
      if (data.cnae02) {
        setValue('cnae02', data.cnae02);
      }
      if (data.cnae01) {
        setValue('cnae01', data.cnae01);
      }
    }
    // Atualiza o state mesclando os dados atuais com os novos e preserva o endereço
    setDataRegister((prevData: any) => ({
      ...(prevData || {}),
      razao_social: data.razao_social,
      nome_fantasia: data.fantasia,
      cnae01: data.cnae01,
      cnae02: data.cnae02,
      telefone_contato: data.telefone,
      endereco: prevData?.endereco || {},
    }));
  };

  // Sempre que o valor do CNPJ mudar, tenta buscar os dados via API
  useEffect(() => {
    const cnpj = getValues('cnpj');
    if (cnpj) {
      fetchCNPJ(cnpj);
    }
  }, [watch('cnpj')]);

  return (
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

      {/* CNPJ */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        CNPJ
      </Typograph>
      <Input
        control={control}
        placeholder="11.222.333/0001-00"
        error={errors.cnpj?.message}
        name="cnpj"
        mask={Masks.BRL_CNPJ}
      />

      <Spacer size="medium" />
      {/* Razão Social */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Razão social
      </Typograph>
      <Input
        control={control}
        error={errors.razao_social?.message}
        name="razao_social"
      />

      <Spacer size="medium" />
      {/* Nome Fantasia */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Nome Fantasia
      </Typograph>
      <Input
        control={control}
        error={errors.nome_fantasia?.message}
        name="nome_fantasia"
      />

      <Spacer size="medium" />
      {/* CNAE 01 */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        CNAE 01
      </Typograph>
      <Input
        control={control}
        error={errors.cnae01?.message}
        name="cnae01"
        mask={dynamicMaskCNAE}
        editable={false}
      />

      <Spacer size="medium" />
      {/* CNAE 02 */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        CNAE 02
      </Typograph>
      <Input
        editable={false}
        control={control}
        error={errors.cnae02?.message}
        name="cnae02"
        mask={dynamicMaskCNAE}
      />

      <Spacer size="medium" />
      {/* Restante dos campos */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Nome da Pessoa Responsável
      </Typograph>
      <Input
        control={control}
        error={errors.responsavel_nome?.message}
        name="responsavel_nome"
      />

      <Spacer size="medium" />
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Inscrição Estadual
      </Typograph>
      <Input control={control} name="ie" error={errors.ie?.message} />

      <Spacer size="medium" />
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Inscrição Municipal
      </Typograph>
      <Input control={control} name="im" error={errors.im?.message} />

      <Spacer size="medium" />
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        CPF da Pessoa Responsável
      </Typograph>
      <Input
        control={control}
        name="responsavel_cpf"
        placeholder="CPF"
        mask={Masks.BRL_CPF}
        keyboard="numeric"
        error={errors.responsavel_cpf?.message}
      />

      <Spacer size="medium" />
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Telefone para contato
      </Typograph>
      <Input
        control={control}
        name="telefone_contato"
        placeholder="Telefone"
        mask={Masks.BRL_PHONE}
        keyboard="numeric"
        error={errors.telefone_contato?.message}
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
      <Input control={control} error={errors.email?.message} name="email" />

      <Spacer size="medium" />
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Confirmar Email
      </Typograph>
      <Input
        control={control}
        error={errors.email_confirmation?.message}
        name="email_confirmation"
      />

      <Spacer size="medium" />
      <Spacer size="medium" />
      <Button
        text={step === 4 ? 'Finalizar cadastro' : 'Próximo'}
        style={{ height: theme.sizes.extralarge }}
        variant="quaternary"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      />
    </View>
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
