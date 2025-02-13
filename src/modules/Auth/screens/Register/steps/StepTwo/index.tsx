import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Input from '@components/Input';
import Line from '@components/Line';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@components/Button';
import { schemaStepTwo } from '../../services/register.schema';
import { Masks } from 'react-native-mask-input';
import { getCEP } from '../../services/register.services';
import useAuthStore from 'src/store/authStore';

interface EnderecoForm {
  cep?: string;
  logradouro?: string;
  estado?: string;
  bairro?: string;
  cidade?: string;
  numero?: string;
  complemento?: string;
  id_cidade?: string;
}

const StepTwo = ({ setDataRegister, dataRegister, step, setStep }: any) => {
  const { tokenTemp } = useAuthStore();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<EnderecoForm>({
    resolver: yupResolver(schemaStepTwo),
    mode: 'onBlur',
    defaultValues: {
      cep: dataRegister?.endereco?.cep ?? '',
      logradouro: dataRegister?.endereco?.logradouro ?? '',
      estado: dataRegister?.endereco?.estado ?? '',
      bairro: dataRegister?.endereco?.bairro ?? '',
      cidade: dataRegister?.endereco?.cidade ?? '',
      numero: dataRegister?.endereco?.numero ?? '',
      complemento: dataRegister?.endereco?.complemento ?? '',
      id_cidade: dataRegister?.endereco?.id_cidade ?? null,
    },
  });

  const cep = watch('cep');

  const onSubmit = async (data: EnderecoForm) => {
    setDataRegister((prevData: any) => ({
      ...prevData,
      endereco: data,
    }));
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const getCEPData = async () => {
    if (cep && cep.replace(/\D/g, '').length === 8) {
      const cepData = await getCEP({
        setLoading: () => {},
        tokenTemp,
        cep,
      });
      if (cepData) {
        if (cepData.cidade) {
          setValue('cidade', cepData.cidade, { shouldValidate: true });
        }
        if (cepData.uf) {
          setValue('estado', cepData.uf, { shouldValidate: true });
        }
        if (cepData.id_cidade) {
          setValue('id_cidade', cepData.id_cidade, { shouldValidate: true });
        }
        if (cepData.bairro) {
          setValue('bairro', cepData.bairro, { shouldValidate: true });
        }
        if (cepData.endereco) {
          setValue('logradouro', cepData.endereco, { shouldValidate: true });
        }
      }
    }
  };

  useEffect(() => {
    if (cep && cep.replace(/\D/g, '').length === 8) {
      getCEPData();
    }
  }, [cep]);

  return (
    <View style={styles.content}>
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="500"
        style={styles.title}
      >
        2. Endereço
      </Typograph>
      <Spacer size="medium" />
      <Line progress={0.5} height={8} />
      <Spacer size="medium" />

      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Logradouro
      </Typograph>
      <Input
        control={control}
        error={errors.logradouro?.message}
        name="logradouro"
      />
      <Spacer size="medium" />

      <View style={styles.row}>
        <View style={styles.column}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Número
          </Typograph>
          <Input
            control={control}
            error={errors.numero?.message}
            name="numero"
            keyboard="numeric"
          />
        </View>
        <View style={styles.column}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Complemento
          </Typograph>
          <Input
            control={control}
            error={errors.complemento?.message}
            name="complemento"
          />
        </View>
      </View>
      <Spacer size="medium" />

      <View style={styles.row}>
        <View style={styles.column}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            CEP
          </Typograph>
          <Input
            control={control}
            error={errors.cep?.message}
            name="cep"
            mask={Masks.ZIP_CODE}
            keyboard="numeric"
          />
        </View>
        <View style={styles.column}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Bairro
          </Typograph>
          <Input
            control={control}
            error={errors.bairro?.message}
            name="bairro"
          />
        </View>
      </View>
      <Spacer size="medium" />

      <View style={styles.row}>
        <View style={styles.columnSeconddary}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Cidade
          </Typograph>
          <Input
            control={control}
            error={errors.cidade?.message}
            name="cidade"
          />
        </View>
        <View style={styles.comlumnTertiary}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Estado
          </Typograph>
          <Input
            control={control}
            error={errors.estado?.message}
            name="estado"
          />
        </View>
      </View>
      <Spacer size="medium" />

      <Button
        text={step === 4 ? 'Finalizar cadastro' : 'Próximo'}
        style={{ height: theme.sizes.extralarge }}
        variant="quaternary"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: theme.spacing.extraSmall,
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  column: {
    width: '49%',
  },
  columnSeconddary: {
    width: '68%',
  },
  comlumnTertiary: {
    width: '30%',
  },
});
