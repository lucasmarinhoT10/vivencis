import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import DownloadFile from '@components/DownloadFile';
import Input from '@components/Input';
import ImageUploader from '@components/ImageUploader';
import Line from '@components/Line';
import Button from '@components/Button';
import SelectDrop from '@components/SelectDrop';
import { getDocumentosTipo } from '@modules/Auth/screens/Register/services/register.services';
import {
  addNewTechnician,
  editTechnician,
  fetchTechnicians,
} from '../../services/technicians.services';
import { removingSpecialChars, uriToBase64 } from 'src/config/utils';
import useUserStore from 'src/store/userStore';
import { useNavigation } from '@react-navigation/native';
import { delay } from '@utils/delay';
import useTechniciansStore from 'src/store/techniciansStore';

const schema = yup.object().shape({
  namePersonResponsible: yup
    .string()
    .required('A descrição da qualificação é obrigatória'),
});
const schemaName = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório!'),
});

interface StepThreeProps {
  setDataRegister: (data: any) => void;
  dataRegister: any;
  step: number;
  setStep: (step: number) => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  setDataRegister,
  dataRegister,
  setStep,
}) => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [qualifications, setQualifications] = useState<
    Array<{
      fileName: string;
      description: string;
      uri: string;
      validade: string;
    }>
  >([]);
  const [visible, setVisible] = useState(false);
  const [docsTipo, setDocsTipo] = useState<any[]>([]);
  const [imageUriQualifications, setImageUriQualifications] = useState<
    string | null
  >(null);
  const [validade, setValidade] = useState<string>('');
  const [validadeError, setValidadeError] = useState<string | null>('');
  const [imageUriQualificationsError, setImageUriQualificationsError] =
    useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const navigation = useNavigation();
  const { setTechnicians } = useTechniciansStore();
  const getDocsTipoData = async () => {
    await getDocumentosTipo({ setLoading: () => {}, setDocsTipo });
  };
  useEffect(() => {
    getDocsTipoData();
  }, []);
  const getTechnicians = async () => {
    await fetchTechnicians({
      id_parceiro: user?.id_entidade,
      setLoading,
      setTechnicians,
    });
  };

  const handleAddQualification = () => {
    if (!imageUriQualifications) {
      setImageUriQualificationsError('Selecione uma imagem');
      console.log('Erro: Nenhuma imagem selecionada');
      return;
    }
    if (!description) {
      Alert.alert('Erro', 'Selecione uma qualificação no menu');
      console.log('Erro: Nenhuma qualificação selecionada');
      return;
    }
    if (!validade) {
      setValidadeError('Digite a validade');
      console.log('Erro: Validade não informada');
      return;
    }

    const qual = {
      fileName: docsTipo?.find((it: any) => it.cod_tipo === description)
        ?.descricao,
      description: description,
      uri: imageUriQualifications,
      validade: validade,
    };
    console.log('Adicionando qualificação:', qual);

    setQualifications((prev) => [...prev, qual]);
    setImageUriQualifications(null);
    setValidade('');
    setDescription('');
  };
  const methods = useForm<any>({
    resolver: yupResolver(schemaName),
    mode: 'onChange',
    defaultValues: {
      nome: dataRegister?.nome || '',
    },
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit = async () => {
    try {
      const convertedDocuments = await Promise.all(
        qualifications.map(async (it) => ({
          base64: await uriToBase64(it.uri),
          validade: it.validade,
          tipo_documento: 4,
        }))
      );
      const payload =
        convertedDocuments?.length > 0
          ? {
              documentosQualificacoes: convertedDocuments,
              nome: getValues('nome'),
            }
          : { nome: getValues('nome') };

      setDataRegister(payload);

      const response = await editTechnician({
        setLoading,
        id_tecnico: dataRegister?.id,
        payload,
      });

      if (!response?.success) {
        Alert.alert(
          'Erro',
          `Não foi possível editar o cadastro, ${response?.erro}`
        );
      } else if (response?.success) {
        Alert.alert('Sucesso', 'O técnico foi editado com sucesso', [
          {
            text: 'OK',
            onPress: async () => {
              navigation.goBack();
            },
          },
        ]);
      }
      await getTechnicians();
      setStep(1);
    } catch (error) {
      await getTechnicians();
      console.error('Erro ao enviar os dados:', error);

      Alert.alert('Erro', 'Não foi possível finalizar o cadastro');
    }
  };
  return (
    <>
      <View style={styles.content}>
        <View>
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
            fontWeight="500"
            style={styles.title}
          >
            Qualificações
          </Typograph>
          <Spacer size="small" />

          {qualifications.map((qualification) => (
            <View key={qualification.uri} style={styles.fileCard}>
              <ImageUploader
                fileName={qualification.fileName}
                onDeletePress={() =>
                  setQualifications((prev) =>
                    prev.filter((q) => q.uri !== qualification.uri)
                  )
                }
              />
            </View>
          ))}
          <Spacer size="small" />

          <SelectDrop
            title={'Qualificação'}
            options={docsTipo?.map((it: any) => it?.descricao) ?? []}
            setVisible={setVisible}
            visible={visible}
            setSelected={(item) => {
              const selectedCodTipo =
                docsTipo?.find((it: any) => it?.descricao === item)?.cod_tipo ||
                '';
              setDescription(selectedCodTipo);
            }}
            selected={
              (docsTipo &&
                description &&
                docsTipo?.find((it: any) => it?.cod_tipo === description)
                  ?.descricao) ??
              description
            }
          />
          <Spacer size="medium" />

          <Input
            placeholder="Digite a validade"
            name=""
            value={validade}
            onChangeText={(it) => {
              const numericValue = it.replace(/\D/g, '');
              let formattedValue = numericValue;
              if (numericValue.length > 2) {
                formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
              }
              if (numericValue.length > 4) {
                formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
              }
              setValidade(formattedValue);
              setValidadeError(null);
            }}
            keyboardType="numeric"
          />
          {validadeError && (
            <Typograph
              variant="body"
              textAlign="left"
              fontWeight="400"
              style={styles.errorText}
            >
              {validadeError}
            </Typograph>
          )}
          <Spacer size="medium" />

          <DownloadFile
            iconType="file"
            label="Anexar arquivo"
            setSelectedImage={(uri: any) => {
              setImageUriQualifications(uri);
              setImageUriQualificationsError(null);
            }}
            selectedImage={imageUriQualifications}
          />
          {imageUriQualificationsError && (
            <Typograph
              textAlign="left"
              fontWeight="400"
              style={styles.errorText}
            >
              {imageUriQualificationsError}
            </Typograph>
          )}
          <Spacer size="large" />

          <TouchableOpacity onPress={handleAddQualification}>
            <Typograph
              variant="title"
              textAlign="center"
              fontWeight="500"
              style={{
                color: theme.colors.primary.link,
                fontSize: theme.sizes.small,
              }}
            >
              Adicionar qualificação
            </Typograph>
          </TouchableOpacity>

          <Button
            text="Editar Cadastro"
            variant="quaternary"
            style={styles.button}
            onPress={() => {
              onSubmit();
            }}
          />
        </View>
      </View>
    </>
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
  fileCard: {
    marginVertical: theme.spacing.small,
  },
  button: {
    marginTop: 90,
    height: theme.sizes.extralarge,
  },
  errorText: {
    color: theme.colors.error.light,
    fontSize: theme.spacing.small,
    marginTop: 4,
  },
});
