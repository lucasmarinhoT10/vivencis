import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '@components/Input';
import Line from '@components/Line';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import Button from '@components/Button';
import { theme } from '@theme/theme';
import { Controller, useForm } from 'react-hook-form';
import {
  getAccounts,
  getBancos,
  getPixTipo,
} from '../../services/register.services';
import SelectDrop from '@components/SelectDrop';
import useAuthStore from 'src/store/authStore';
import { Masks } from 'react-native-mask-input';

const StepThree = ({ setDataRegister, dataRegister, step, setStep }: any) => {
  const { tokenTemp } = useAuthStore();
  const [bancos, setBancos] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [pixTipos, setPixTipos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visiblePix, setVisiblePix] = useState(false);
  const [visibleType, setVisibleType] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    // Não utilizaremos um resolver; a validação será feita manualmente
    defaultValues: {
      agencia: dataRegister?.dados_bancarios?.agencia ?? '',
      agencia_dv: dataRegister?.dados_bancarios?.agencia_dv ?? '',
      chave_pix: dataRegister?.dados_bancarios?.chave_pix ?? '',
      id_banco: dataRegister?.dados_bancarios?.id_banco ?? '',
      id_tipo_pix: dataRegister?.dados_bancarios?.id_tipo_pix ?? '',
      conta: dataRegister?.dados_bancarios?.conta ?? '',
      conta_dv: dataRegister?.dados_bancarios?.conta_dv ?? '',
      tipo_conta: dataRegister?.dados_bancarios?.tipo_conta ?? '',
      titular_conta: dataRegister?.dados_bancarios?.titular_conta ?? '',
    },
  });

  // Função de validação manual: todos os campos são obrigatórios
  const validateForm = (data: any) => {
    const newErrors: any = {};
    if (!data.id_banco || data.id_banco === '')
      newErrors.id_banco = 'Banco é obrigatório';
    if (!data.titular_conta || data.titular_conta.trim() === '')
      newErrors.titular_conta = 'Titular da conta é obrigatório';
    if (!data.tipo_conta || data.tipo_conta === '')
      newErrors.tipo_conta = 'Tipo de conta é obrigatório';
    if (!data.conta || data.conta.trim() === '')
      newErrors.conta = 'Número da conta é obrigatório';
    if (!data.conta_dv || data.conta_dv.trim() === '')
      newErrors.conta_dv = 'Dígito da conta é obrigatório';
    if (!data.agencia || data.agencia.trim() === '')
      newErrors.agencia = 'Agência é obrigatória';
    if (!data.agencia_dv || data.agencia_dv.trim() === '')
      newErrors.agencia_dv = 'Dígito da agência é obrigatório';
    if (!data.id_tipo_pix || data.id_tipo_pix === '')
      newErrors.id_tipo_pix = 'Tipo da chave pix é obrigatório';
    if (!data.chave_pix || data.chave_pix.trim() === '')
      newErrors.chave_pix = 'Chave pix é obrigatória';
    return newErrors;
  };

  const onSubmit = async (data: any) => {
    // Realiza a validação manual
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      for (const key in validationErrors) {
        setError(key, { type: 'manual', message: validationErrors[key] });
      }
      return; // Se houver erros, não prossegue
    }

    // Se estiver tudo certo, salva os dados e avança para o próximo passo
    setDataRegister((prevData: any) => ({
      ...prevData,
      dados_bancarios: data,
    }));

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const getBancosData = async () => {
    await getBancos({ setLoading: () => {}, setBancos, tokenTemp });
  };

  const getAccountsData = async () => {
    await getAccounts({ setLoading: () => {}, setAccounts, tokenTemp });
  };

  const getPixData = async () => {
    await getPixTipo({ setLoading: () => {}, setPixTipos, tokenTemp });
  };

  useEffect(() => {
    getBancosData();
    getAccountsData();
    getPixData();
  }, []);

  return (
    <View style={styles.content}>
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="500"
        style={styles.title}
      >
        3. Dados bancários
      </Typograph>
      <Spacer size="medium" />
      <Line progress={0.8} height={8} />
      <Spacer size="medium" />

      {/* Campo Banco */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Banco
      </Typograph>
      <Controller
        control={control}
        name="id_banco"
        render={() => (
          <SelectDrop
            options={bancos?.map((it: any) => it?.descricao)}
            error={errors.id_banco?.message}
            name="id_banco"
            setVisible={setVisible}
            visible={visible}
            setSelected={(item) => {
              const selectedValue = bancos?.find(
                (it: any) => it?.descricao === item
              )?.cod_banco;
              setValue('id_banco', selectedValue);
              clearErrors('id_banco');
            }}
            selected={
              (bancos &&
                getValues('id_banco') &&
                bancos?.find(
                  (it: any) => it?.cod_banco === getValues('id_banco')
                )?.descricao) ??
              ''
            }
          />
        )}
      />
      <Spacer size="medium" />

      {/* Titular da conta */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Titular da conta
      </Typograph>
      <Input
        control={control}
        error={errors.titular_conta?.message}
        name="titular_conta"
      />
      <Spacer size="medium" />

      {/* Tipo de conta */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Tipo de conta
      </Typograph>
      <Controller
        control={control}
        name="tipo_conta"
        render={() => (
          <SelectDrop
            title=""
            options={accounts}
            error={errors.tipo_conta?.message}
            setVisible={setVisibleType}
            visible={visibleType}
            setSelected={(item) => {
              setValue('tipo_conta', item);
              clearErrors('tipo_conta');
            }}
            selected={getValues('tipo_conta') ?? ''}
          />
        )}
      />
      <Spacer size="medium" />

      {/* Número da conta e Dígito da conta */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Número da conta
          </Typograph>
          <Input control={control} error={errors.conta?.message} name="conta" />
        </View>
        <View style={styles.column}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Dígito conta
          </Typograph>
          <Input
            control={control}
            error={errors.conta_dv?.message}
            name="conta_dv"
            maxLength={1}
            keyboard="numeric"
          />
        </View>
      </View>
      <Spacer size="medium" />

      {/* Agência e Dígito da agência */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Typograph
            variant="title"
            textAlign="left"
            fontWeight="400"
            style={styles.title}
          >
            Agência
          </Typograph>
          <Input
            control={control}
            error={errors.agencia?.message}
            name="agencia"
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
            Dígito agência
          </Typograph>
          <Input
            maxLength={1}
            control={control}
            error={errors.agencia_dv?.message}
            name="agencia_dv"
            keyboard="numeric"
          />
        </View>
      </View>
      <Spacer size="medium" />

      {/* Tipo da chave pix */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Tipo da chave pix
      </Typograph>
      <Controller
        control={control}
        name="id_tipo_pix"
        render={() => (
          <SelectDrop
            title=""
            options={pixTipos.map((it: any) => it?.descricao)}
            error={errors.id_tipo_pix?.message}
            setVisible={setVisiblePix}
            visible={visiblePix}
            setSelected={(item) => {
              const selectedValue = pixTipos?.find(
                (it: any) => it?.descricao === item
              )?.cod_tipo_pix;
              setValue('id_tipo_pix', selectedValue);
              clearErrors('id_tipo_pix');
              setValue('chave_pix', '');
            }}
            selected={
              (pixTipos &&
                getValues('id_tipo_pix') &&
                pixTipos?.find(
                  (it: any) => it?.cod_tipo_pix === getValues('id_tipo_pix')
                )?.descricao) ??
              ''
            }
          />
        )}
      />
      <Spacer size="medium" />

      {/* Chave Pix */}
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="400"
        style={styles.title}
      >
        Chave Pix
      </Typograph>
      <Input
        control={control}
        error={errors.chave_pix?.message}
        name="chave_pix"
        mask={
          getValues('id_tipo_pix') === 1
            ? Masks.BRL_PHONE
            : getValues('id_tipo_pix') === 3
              ? Masks.BRL_CPF_CNPJ
              : null
        }
      />
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

export default StepThree;

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
});
