import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import Container from '@components/Container';
import Button from '@components/Button';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import DownloadFile from '@components/DownloadFile';
import SelectDrop from '@components/SelectDrop';
import { useNavigation } from '@react-navigation/native';
import { ModalConfirmation } from '@components/Modal';
import {
  addVoucherUser,
  getDocumentosTipo,
} from '@modules/Auth/screens/Register/services/register.services';
import { formatAndValidateDateInput } from '@utils/normalilze';
import { uriToBase64 } from 'src/config/utils';
import { theme } from '@theme/theme';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootDrawerParamList } from '@routes/routes';

export default function QualificationDocumentScreen(props: any) {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootDrawerParamList>>();

  const [docsTipo, setDocsTipo] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [qualificationType, setQualificationType] = useState<string | null>(''); // código da qualificação selecionada

  const [validade, setValidade] = useState<string>('');
  const [validadeError, setValidadeError] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileUriError, setFileUriError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const getDocsTipoData = async () => {
    await getDocumentosTipo({ setLoading: () => {}, setDocsTipo });
  };

  useEffect(() => {
    getDocsTipoData();
  }, []);

  const onSubmit = async () => {
    if (!fileUri) {
      setFileUriError('Selecione um arquivo');
      return;
    }
    if (!qualificationType) {
      Alert.alert('Atenção', 'Selecione a qualificação');
      return;
    }
    if (!validade) {
      setValidadeError('Digite a validade');
      return;
    }

    setLoading(true);
    try {
      const convertedDocument = {
        base64: await uriToBase64(fileUri),
        validade,
        tipo_documento: qualificationType,
      };

      const response = await addVoucherUser({
        setLoading,
        payload: {
          documentos_qualificacoes: [convertedDocument],
        },
        isEdit: true,
      });

      if (response.erro) {
        Alert.alert(response.erro);
      } else {
        setSuccessModal(true);
      }
    } catch (error) {
      Alert.alert('Erro ao enviar o documento');
    }
  };

  const handleConfirm = () => {
    setSuccessModal(false);
    setTimeout(() => {
      navigation.navigate('Profile');
    }, 1000);
  };

  return (
    <Container title="Documento de Qualificação" hasGoBack sizeText={18}>
      <ModalConfirmation
        visible={successModal}
        title="Cadastro em análise"
        subtitle="Seu cadastro foi realizado com sucesso. Enquanto nosso time analisa seu documento, você pode navegar normalmente."
        onClose={handleConfirm}
        onConfirm={handleConfirm}
        okText="Ok"
      />

      <Spacer size="medium" />
      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Envio de documento de qualificação
      </Typograph>
      <Spacer size="medium" />

      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Selecione a Qualificação
      </Typograph>
      <Spacer size="small" />
      <SelectDrop
        title="Qualificação"
        options={docsTipo?.map((item: any) => item.descricao) ?? []}
        visible={visible}
        setVisible={setVisible}
        setSelected={(item) =>
          setQualificationType(
            docsTipo.find((doc: any) => doc.descricao === item)?.cod_tipo
          )
        }
        selected={
          docsTipo &&
          qualificationType &&
          docsTipo.find((doc: any) => doc.cod_tipo === qualificationType)
            ?.descricao
            ? docsTipo.find((doc: any) => doc.cod_tipo === qualificationType)
                ?.descricao
            : qualificationType
        }
      />
      <Spacer size="small" />

      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Validade
      </Typograph>
      <Input
        placeholder="Digite a validade"
        value={validade}
        onChangeText={(text) => {
          const { value: formatted, error } = formatAndValidateDateInput(
            text,
            validade,
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
      <Spacer size="small" />

      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Upload do Arquivo/Foto
      </Typograph>
      <Spacer size="small" />
      <DownloadFile
        iconType="file"
        label="Anexar arquivo"
        setSelectedImage={(uri) => {
          setFileUriError(null);
          setFileUri(uri);
        }}
        selectedImage={fileUri}
      />
      {fileUriError && (
        <Typograph textAlign="left" fontWeight="400" style={styles.errorText}>
          {fileUriError}
        </Typograph>
      )}
      <Spacer size="extraLarge" />

      <Button
        style={{ height: 48, marginBottom: 52 }}
        variant="quinary"
        text="Enviar documento"
        fontWeight="600"
        onPress={() => setConfirmationModal(true)}
        loading={loading}
      />

      <ModalConfirmation
        visible={confirmationModal}
        title="Documento de Qualificação"
        subtitle="Você tem certeza que deseja enviar este documento?"
        icon={false}
        isConfirm={true}
        onClose={() => setConfirmationModal(false)}
        onConfirm={() => {
          setConfirmationModal(false);
          onSubmit();
        }}
        cancelText="Cancelar"
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: theme.spacing.extraSmall,
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.error.light,
    fontSize: theme.spacing.small,
    marginTop: 4,
  },
});
