import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '@components/Input';
import Line from '@components/Line';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import DownloadFile from '@components/DownloadFile';
import ImageUploader from '@components/ImageUploader';
import Button from '@components/Button';
import { theme } from '@theme/theme';
import { delay } from '@utils/delay';
import { removingSpecialChars, uriToBase64 } from 'src/config/utils';
import {
  getDocumentosTipo,
  registerUser,
} from '../../services/register.services';
import useAuthStore from 'src/store/authStore';
import { Masks } from 'react-native-mask-input';
import SelectDrop from '@components/SelectDrop';
import { formatAndValidateDateInput } from '@utils/normalilze';

const schemaStepFour = yup.object().shape({
  cnpj: yup.string().required('O cartão CNPJ é obrigatório'),
  responsibleId: yup.string().required('A identidade ou CNH é obrigatória'),
});

const StepFour = ({
  setDataRegister,
  dataRegister,
  step,
  setStep,
  setModalVisible,
  isEdit,
}: any) => {
  const { tokenTemp } = useAuthStore();
  const {
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaStepFour),
    mode: 'onBlur',
  });

  const [qualifications, setQualifications] = useState<
    Array<{
      id: string;
      fileName: string;
      tipo_documento: string;
      uri: string;
      validade: string;
    }>
  >([]);
  const [nextId, setNextId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [docsTipo, setDocsTipo] = useState([]);
  const handleAddQualification = (
    description: string,
    uri: string,
    validade: string
  ) => {
    setQualifications((prev) => [
      ...prev,
      {
        tipo_documento: description,
        id: new Date().getTime().toString(),
        fileName: `qualificacao-${new Date().getTime().toString()}.pdf`,
        uri: uri,
        validade: validade,
      },
    ]);

    setDescription('');
    setValidade('');
    setImageUriQualifications(null);
  };

  const onSubmit = async (data: any) => {
    await delay(500);

    const convertedDocumentsCNPJ = await Promise.all(
      Object.entries(data).map(async ([tipo_documento, uri]) => ({
        base64: await uriToBase64(uri),
        validade: '10/12/2025',
        tipo_documento: tipo_documento === 'responsibleId' ? 3 : 1,
      }))
    );

    const convertedDocuments = await Promise.all(
      qualifications.map(async (it) => ({
        base64: await uriToBase64(it.uri),
        validade: it?.validade,
        tipo_documento: it.tipo_documento,
      }))
    );
    setDataRegister((prevData: any) => ({
      ...prevData,
      documentosQualificacoes: [
        ...convertedDocumentsCNPJ,
        ...convertedDocuments,
      ],
    }));
    const response = await registerUser({
      setLoading,
      payload: {
        cnpj: removingSpecialChars(dataRegister?.cnpj),
        ie: dataRegister?.ie,
        im: dataRegister?.im,
        cnae01: dataRegister?.cnae01,
        cnae02: dataRegister?.cnae02,
        razao_social: dataRegister?.razao_social,
        nome_fantasia: dataRegister?.nome_fantasia,
        endereco: {
          cep: dataRegister?.endereco.cep,
          logradouro: dataRegister?.endereco?.logradouro,
          numero: dataRegister?.endereco?.numero,
          id_cidade: dataRegister?.endereco?.id_cidade,
          bairro: dataRegister?.endereco?.bairro,
          complemento: dataRegister?.endereco?.complemento,
        },
        responsavel_nome: dataRegister.responsavel_nome,
        responsavel_cpf: removingSpecialChars(dataRegister.responsavel_cpf),
        telefone_contato: dataRegister.telefone_contato,
        email: dataRegister?.email,
        dados_bancarios: dataRegister?.dados_bancarios,
        documentos_qualificacoes: [
          ...convertedDocumentsCNPJ,
          ...convertedDocuments,
        ],
      },
      tokenTemp,
      isEdit,
    });

    if (response.erro) {
      Alert.alert(response.erro);
    } else {
      setModalVisible(true);
    }
  };

  const [imageUri, setImageUri] = useState<string | null>(
    getValues('responsibleId')
  );
  const [description, setDescription] = useState<string | null>('');
  const [validade, setValidade] = useState<string | null>('');
  const [descriptionError, setDescriptionError] = useState<string | null>('');
  const [validadeError, setValidadeError] = useState<string | null>('');
  const [imageUriId, setImageUriId] = useState<string | null>(
    getValues('responsibleId')
  );
  const [imageUriQualifications, setImageUriQualifications] = useState<
    string | null
  >();
  const [imageUriQualificationsError, setImageUriQualificationsError] =
    useState<string | null>();

  const handleImageSelect = (uri: string, type: any) => {
    if (type === 'responsibleId') {
      setImageUriId(uri);
    } else {
      setImageUri(uri);
    }
    setValue(type, uri);
  };

  const getDocsTipoData = async () => {
    await getDocumentosTipo({ setLoading: () => {}, setDocsTipo, tokenTemp });
  };
  useEffect(() => {
    getDocsTipoData();
  }, []);
  return (
    <View style={styles.content}>
      <Typograph
        variant="title"
        textAlign="left"
        fontWeight="500"
        style={styles.title}
      >
        4. Documentos e qualificações
      </Typograph>
      <Spacer size="medium" />
      <Line progress={0.98} height={8} />
      <Spacer size="medium" />
      <View>
        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          Cartão CNPJ
        </Typograph>
        <DownloadFile
          iconType="photo"
          label="Adicionar fotos"
          setSelectedImage={(uri) => handleImageSelect(uri, 'cnpj')}
          selectedImage={imageUri}
        />
        {errors.cnpj && (
          <Typograph textAlign="left" fontWeight="400" style={styles.errorText}>
            {errors.cnpj.message}
          </Typograph>
        )}
        <Spacer size="medium" />
        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          Identidade ou CNH da pessoa responsável
        </Typograph>
        <DownloadFile
          iconType="photo"
          label="Anexar fotos"
          setSelectedImage={(uri) => handleImageSelect(uri, 'responsibleId')}
          selectedImage={imageUriId}
        />
        {errors.responsibleId && (
          <Typograph textAlign="left" fontWeight="400" style={styles.errorText}>
            {errors.responsibleId.message}
          </Typograph>
        )}
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

        {qualifications.map((qualification) => {
          return (
            <View key={qualification.id} style={styles.fileCard}>
              <ImageUploader
                title={`Qualificação ${qualification?.tipo_documento}`}
                fileName={qualification.fileName}
                onDeletePress={() =>
                  setQualifications((prev) =>
                    prev.filter((q) => q.id !== qualification.id)
                  )
                }
              />
            </View>
          );
        })}
        <Spacer size="small" />
        <SelectDrop
          title={'Qualificação'}
          options={docsTipo?.map((it: any) => it?.descricao) ?? []}
          setVisible={setVisible}
          visible={visible}
          setSelected={(item) =>
            setDescription(
              docsTipo?.find((it: any) => it?.descricao === item)?.cod_tipo
            )
          }
          selected={
            (docsTipo &&
              description &&
              docsTipo?.find((it: any) => it?.cod_tipo === description)
                ?.descricao) ??
            description
          }
        />
        {/* <Input
          placeholder="Descreva a qualificação"
          name="qualificationDescription"
          maxLength={50}
          value={description ?? ''}
          onChangeText={(it) => {
            setDescription(it);
            setDescriptionError(null);
          }}
        /> */}
        {descriptionError && (
          <Typograph
            variant="body"
            textAlign="left"
            fontWeight="400"
            style={styles.errorText}
          >
            {descriptionError}
          </Typograph>
        )}
        <Spacer size="medium" />

        <Input
          placeholder="Digite a validade"
          name=""
          value={validade ?? ''}
          onChangeText={(it) => {
            const { value: formatted, error } = formatAndValidateDateInput(
              it,
              validade ?? '',
              false
            );
            if (!error) {
              setValidade(formatted);
              setValidadeError(null);
            } else {
              setValidadeError(error);
            }
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
          selectedImage={imageUriQualifications}
          setSelectedImage={(uri: any) => {
            setImageUriQualificationsError(null);
            setImageUriQualifications(uri);
          }}
        />
        {imageUriQualificationsError?.length && (
          <Typograph textAlign="left" fontWeight="400" style={styles.errorText}>
            {imageUriQualificationsError}
          </Typograph>
        )}
        <Spacer size="large" />
        <TouchableOpacity
          onPress={() => {
            if (imageUriQualifications) {
              handleAddQualification(
                description ?? '',
                imageUriQualifications,
                validade ?? ''
              );
            } else {
              setImageUriQualificationsError('Selecione uma imagem');
              setDescriptionError('Escreva uma qualificação');
            }
          }}
        >
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
      </View>
      <Spacer size="large" />
      <Button
        text={step === 4 ? 'Finalizar cadastro' : 'Próximo'}
        style={{ height: theme.sizes.extralarge }}
        variant="quaternary"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </View>
  );
};

export default StepFour;

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
  errorText: {
    color: theme.colors.error.light,
    fontSize: theme.spacing.small,
    marginTop: 4,
  },
});
