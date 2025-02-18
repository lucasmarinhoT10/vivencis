import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { delay } from '@utils/delay';
import { uriToBase64 } from 'src/config/utils';
import {
  getDocumentosTipo,
  registerUser,
} from '../../services/register.services';
import useAuthStore from 'src/store/authStore';
import Input from '@components/Input';
import Line from '@components/Line';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import DownloadFile from '@components/DownloadFile';
import ImageUploader from '@components/ImageUploader';
import Button from '@components/Button';
import SelectDrop from '@components/SelectDrop';
import { formatAndValidateDateInput } from '@utils/normalilze';
import { theme } from '@theme/theme';

const StepFour = ({
  setDataRegister,
  dataRegister,
  step,
  setStep,
  setModalVisible,
  isEdit,
  startData, // Dados iniciais (antes de alterações)
}: any) => {
  const { tokenTemp } = useAuthStore();

  // Estado dos documentos atuais (qualificações)
  const [qualifications, setQualifications] = useState<
    Array<{
      id?: string;
      id_objeto?: number;
      fileName?: string;
      nome_qualificacao?: string;
      tipo_documento: number;
      uri?: string | null;
      validade?: string;
      dta_validade?: string;
      status?: string;
      // Será marcada como true se o documento recebeu nova URI (foi alterado)
      isUpdated?: boolean;
    }>
  >(dataRegister?.isEdit ? dataRegister?.documentos_qualificacoes : []);

  const [loading, setLoading] = useState(false);
  const [docsTipo, setDocsTipo] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  // Estados do formulário de adição/edição
  const [selectedQualification, setSelectedQualification] = useState<
    number | null
  >(null);
  // Usamos este estado para guardar o item que está sendo editado
  const [selectedQualificationEdit, setSelectedQualificationEdit] =
    useState<any>(null);
  const [qualificationValidade, setQualificationValidade] =
    useState<string>('');
  const [qualificationFileUri, setQualificationFileUri] = useState<
    string | null
  >(null);

  // Estados para exibição de erros
  const [qualificationTypeError, setQualificationTypeError] = useState<
    string | null
  >(null);
  const [qualificationValidadeError, setQualificationValidadeError] = useState<
    string | null
  >(null);
  const [qualificationFileError, setQualificationFileError] = useState<
    string | null
  >(null);

  // Recupera as opções de tipos de documentos
  const getDocsTipoData = async () => {
    await getDocumentosTipo({ setLoading: () => {}, setDocsTipo, tokenTemp });
  };

  useEffect(() => {
    getDocsTipoData();
  }, []);

  // Tipos já selecionados localmente
  const localQualificationTypes = useMemo(
    () => qualifications.map((q) => q.tipo_documento),
    [qualifications]
  );

  // Tipos que já existem no dataRegister (exceto os com status REPROVADO)
  const existingQualificationTypes = useMemo(() => {
    return (
      dataRegister?.documentos_qualificacoes
        ?.filter((doc: any) => doc.status !== 'REPROVADO')
        .map((doc: any) => doc.tipo_documento) || []
    );
  }, [dataRegister]);

  const excludedQualificationTypes = useMemo(
    () => [...localQualificationTypes, ...existingQualificationTypes],
    [localQualificationTypes, existingQualificationTypes]
  );

  const filteredDocsTipo = useMemo(() => {
    return docsTipo.filter(
      (doc: any) => !excludedQualificationTypes.includes(doc.cod_tipo)
    );
  }, [docsTipo, excludedQualificationTypes]);

  // Permite edição se o item for novo (sem status) ou se estiver com status REPROVADO
  const canEditQualification = (qualification: any) => {
    return !qualification.status || qualification.status === 'REPROVADO';
  };

  // Ao clicar em "Editar", carregamos os dados do item para o formulário e
  // guardamos o item atual em selectedQualificationEdit.
  const handleEditQualification = (qualification: any) => {
    setSelectedQualificationEdit(qualification);
    setSelectedQualification(qualification.tipo_documento);
    setQualificationValidade(
      qualification.validade || qualification.dta_validade || ''
    );
    setQualificationFileUri(qualification.uri || null);
    setQualificationTypeError(null);
    setQualificationValidadeError(null);
    setQualificationFileError(null);
    // Opcional: você pode também rolar a tela para o formulário, se necessário.
  };

  // Ao clicar em "Adicionar qualificação", se estivermos editando (selectedQualificationEdit não for nulo),
  // atualizamos o item existente; caso contrário, adicionamos um novo.
  const handleAddQualification = () => {
    if (!selectedQualification) {
      setQualificationTypeError('Selecione uma qualificação');
      return;
    }
    if (!qualificationValidade) {
      setQualificationValidadeError('Digite a data de validade');
      return;
    }
    if (!qualificationFileUri) {
      setQualificationFileError('Selecione um arquivo');
      return;
    }
    if (selectedQualificationEdit) {
      // Atualiza o item existente preservando os demais dados (como dta_validade e id_objeto)
      const updatedItem = {
        ...selectedQualificationEdit,
        tipo_documento: selectedQualification,
        fileName: `qualificacao-${new Date().getTime().toString()}.pdf`,
        uri: qualificationFileUri,
        validade: qualificationValidade,
        // Marcar como atualizado para envio
        isUpdated: true,
      };
      setQualifications((prev) =>
        prev.map((q) => {
          const currentId = q.id || q.id_objeto;
          const editId =
            selectedQualificationEdit.id || selectedQualificationEdit.id_objeto;
          return currentId === editId ? updatedItem : q;
        })
      );
      setSelectedQualificationEdit(null);
    } else {
      // Adiciona novo item
      const newQualification: any = {
        id: new Date().getTime().toString(),
        tipo_documento: selectedQualification,
        fileName: `qualificacao-${new Date().getTime().toString()}.pdf`,
        uri: qualificationFileUri,
        validade: qualificationValidade,
      };
      if (isEdit) {
        newQualification.isUpdated = true;
      }
      setQualifications((prev) => [...prev, newQualification]);
    }
    // Reseta o formulário
    setSelectedQualification(null);
    setQualificationValidade('');
    setQualificationFileUri(null);
    setQualificationTypeError(null);
    setQualificationValidadeError(null);
    setQualificationFileError(null);
  };

  // Função auxiliar: compara dois objetos e retorna apenas as propriedades alteradas (exceto campos sensíveis)
  const getChangedData = (original: any, updated: any) => {
    const delta: any = {};
    const ignoreKeys = [
      'cnpj',
      'responsavel_cpf',
      'email',
      'email_confirmation',
      'telefone_contato',
      'endereco',
      'dados_bancarios',
      'ie',
      'im',
      'cnae01',
      'cnae02',
    ];
    for (const key in updated) {
      if (ignoreKeys.includes(key)) continue;
      if (
        typeof updated[key] === 'object' &&
        updated[key] !== null &&
        !Array.isArray(updated[key])
      ) {
        const nestedDelta = getChangedData(original[key] || {}, updated[key]);
        if (Object.keys(nestedDelta).length > 0) {
          delta[key] = nestedDelta;
        }
      } else if (
        JSON.stringify(updated[key]) !== JSON.stringify(original[key])
      ) {
        delta[key] = updated[key];
      }
    }
    return delta;
  };

  // Retorna somente os documentos que foram alterados ou que são novos.
  // Um documento é considerado alterado se não existir em startData ou se estiver marcado com isUpdated === true.
  const getDeltaDocuments = (originalDocs: any[], currentDocs: any[]) => {
    return currentDocs.filter((doc) => {
      const originalDoc = originalDocs.find(
        (o) => (o.id || o.id_objeto) === (doc.id || doc.id_objeto)
      );
      if (!originalDoc) return true;
      return doc.isUpdated === true;
    });
  };

  // Ao submeter, converte as URIs para base64 e monta o payload delta apenas com os dados alterados.
  // Para cada documento alterado, preserva os dados originais (exceto o campo "status").
  const onSubmit = async () => {
    if (qualifications.length === 0) {
      Alert.alert('Adicione pelo menos uma qualificação');
      return;
    }
    if (
      selectedQualification !== null ||
      qualificationValidade.trim() !== '' ||
      qualificationFileUri !== null
    ) {
      Alert.alert(
        'Finalize a edição',
        'Finalize ou cancele a edição antes de prosseguir.'
      );
      return;
    }
    const qualificationIncompleta = qualifications.find((q) => {
      const temImagemCadastrada = q.uri || q.nome_qualificacao;
      return !temImagemCadastrada || q.status === 'REPROVADO';
    });
    if (qualificationIncompleta) {
      Alert.alert(
        'Atualize as qualificações',
        'Atualize todas as qualificações incompletas ou com status REPROVADO antes de finalizar.'
      );
      return;
    }
    await delay(500);

    let docsPayload;
    if (isEdit && startData.documentos_qualificacoes) {
      const deltaDocs = getDeltaDocuments(
        startData.documentos_qualificacoes,
        qualifications
      );
      docsPayload = await Promise.all(
        deltaDocs.map(async (doc) => {
          const dta_validade = doc.validade || doc.dta_validade;
          // Busca a descrição (nome da qualificação) no docsTipo para incluir no payload
          const nome_qualificacao = docsTipo.find(
            (item: any) => item.cod_tipo === doc.tipo_documento
          )?.descricao;
          return {
            base64: await uriToBase64(doc.uri!),
            dta_validade,
            nome_qualificacao,
            tipo_documento: doc.tipo_documento,
            ...(doc.id_objeto ? { id_objeto: doc.id_objeto } : {}),
            // O campo "status" NÃO é enviado!
          };
        })
      );
      if (docsPayload.length === 0) docsPayload = undefined;
    } else {
      docsPayload = await Promise.all(
        qualifications.map(async (doc) => {
          const validade = doc.validade || doc.dta_validade;
          return {
            base64: await uriToBase64(doc.uri!),
            validade,
            tipo_documento: doc.tipo_documento,
          };
        })
      );
    }

    const updatedData = {
      ...dataRegister,
      ...(docsPayload !== undefined && {
        documentos_qualificacoes: docsPayload,
      }),
    };

    let payload = updatedData;
    if (isEdit && startData) {
      const delta = getChangedData(startData, updatedData);
      if (docsPayload !== undefined) {
        delta.documentos_qualificacoes = docsPayload;
      } else {
        delete delta.documentos_qualificacoes;
      }
      if (Object.keys(delta).length === 0) {
        Alert.alert('Nenhum dado foi alterado');
        return;
      }
      payload = delta;
    }

    setDataRegister(updatedData);

    const response = await registerUser({
      setLoading,
      payload,
      tokenTemp,
      isEdit,
    });
    if (response.erro) {
      Alert.alert('Erro', response.erro);
    } else {
      setModalVisible(true);
    }
  };

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
        {qualifications.map((qualification) => {
          const isEditable = canEditQualification(qualification);
          const description =
            docsTipo.find(
              (doc: any) => doc.cod_tipo === qualification.tipo_documento
            )?.descricao || 'Qualificação';
          const displayName =
            qualification.fileName ||
            qualification.nome_qualificacao ||
            description;
          return (
            <View
              key={qualification.id || qualification.id_objeto}
              style={[
                styles.fileCard,
                // Se o item tem status "REPROVADO" e não foi atualizado, adiciona borda vermelha
                qualification.status === 'REPROVADO' && !qualification.isUpdated
                  ? styles.reprovado
                  : null,
              ]}
            >
              <ImageUploader
                status={qualification?.status}
                title={`Qualificação ${description}`}
                fileName={displayName}
                onEditPress={
                  isEditable
                    ? () => handleEditQualification(qualification)
                    : undefined
                }
                onDeletePress={() =>
                  setQualifications((prev) =>
                    prev.filter(
                      (q) =>
                        (q.id || q.id_objeto) !==
                        (qualification.id || qualification.id_objeto)
                    )
                  )
                }
              />
            </View>
          );
        })}
        <Spacer size="small" />
        <SelectDrop
          title={'Qualificação'}
          options={filteredDocsTipo.map((it: any) => it.descricao) ?? []}
          setVisible={setVisible}
          visible={visible}
          setSelected={(item) => {
            const selected = docsTipo.find((it: any) => it.descricao === item);
            setSelectedQualification(selected?.cod_tipo || null);
          }}
          selected={
            (docsTipo &&
              selectedQualification &&
              docsTipo.find((it: any) => it.cod_tipo === selectedQualification)
                ?.descricao) ||
            ''
          }
        />
        {qualificationTypeError && (
          <Typograph textAlign="left" fontWeight="400" style={styles.errorText}>
            {qualificationTypeError}
          </Typograph>
        )}
        <Spacer size="medium" />
        <Input
          name=""
          placeholder="Digite a validade"
          value={qualificationValidade}
          onChangeText={(it) => {
            const { value: formatted, error } = formatAndValidateDateInput(
              it,
              qualificationValidade,
              false
            );
            if (!error) {
              setQualificationValidade(formatted);
              setQualificationValidadeError(null);
            } else {
              setQualificationValidadeError(error);
            }
          }}
          keyboardType="numeric"
        />
        {qualificationValidadeError && (
          <Typograph textAlign="left" fontWeight="400" style={styles.errorText}>
            {qualificationValidadeError}
          </Typograph>
        )}
        <Spacer size="medium" />
        <DownloadFile
          iconType="file"
          label="Anexar arquivo"
          selectedImage={qualificationFileUri}
          setSelectedImage={(uri: any) => {
            setQualificationFileError(null);
            setQualificationFileUri(uri);
          }}
        />
        {qualificationFileError && (
          <Typograph textAlign="left" fontWeight="400" style={styles.errorText}>
            {qualificationFileError}
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
      </View>
      <Spacer size="large" />
      <Button
        text={step === 4 ? 'Finalizar cadastro' : 'Próximo'}
        style={{ height: theme.sizes.extralarge }}
        variant="quaternary"
        onPress={onSubmit}
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
  // Estilo para itens reprovados que ainda não foram editados
  reprovado: {
    borderWidth: 2,
    borderColor: theme.colors.error.light,
    borderRadius: 8,
  },
});
