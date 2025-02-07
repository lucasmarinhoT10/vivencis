import React, { useState, useEffect } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';

import { theme } from '@theme/theme';
import Container from '@components/Container';
import { useNavigation } from '@react-navigation/native';
import Spacer from '@components/Spacer';
import Button from '@components/Button';
import SelectDrop from '@components/SelectDrop';
import Input from '@components/Input';
import Typograph from '@components/Typograph';
import { AntDesign } from '@expo/vector-icons';
import CodeBar from '@assets/svgs/CodeBar';
import SignatureScreen from '../SignatureScreen';
import { ExpandableCard } from '@components/ExpandableCard';
import { SwitchOption } from '@components/SwitchOption';
import { SelectWithQuantity } from '@components/SelectWithCount';
import {
  fetchCloseOS,
  fetchProducts,
  fetchEvidenciasOS,
} from '../services/project.services';
import useUserStore from 'src/store/userStore';
import DownloadFile from '@components/DownloadFile';
import ImageUploader from '@components/ImageUploader';
import { Masks } from 'react-native-mask-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ExpandableCardPhotos } from '@components/ExpandableCardPhotos';
import { uriToBase64 } from 'src/config/utils';

type Imagem = {
  descricao: string;
  exemplo: string;
  exemplo_url: string;
  id: number;
  obrigatorio: 'S' | 'N';
  pode_camera: 'S' | 'N';
  pode_galeria: 'S' | 'N';
  valida_caid_codbar: 'S' | 'N';
};

type Roles = {
  assinatura: 'S' | 'N';
  grupos: any[];
  imagens: Imagem[];
  testemunhas: 'S' | 'N';
};

const OSClose: React.FC = (props: any) => {
  const data = props?.route?.params;
  const { user } = useUserStore();
  const navigation = useNavigation();

  // Estados de controle gerais
  const [loading, setLoading] = useState(false);
  const [beneficiarioNaoAlfabetizado, setBeneficiarioNaoAlfabetizado] =
    useState(false);
  const [beneficiarioAutorizou, setBeneficiarioAutorizou] = useState(false);
  const [temTroca, setTemTroca] = useState(false);
  const [assinado, setAssinado] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [idFechamento, setIdFechamento] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSignature, setIsSignature] = useState(false);

  // Estados para assinaturas das testemunhas
  const [witnessSignature1, setWitnessSignature1] = useState('');
  const [witnessSignature2, setWitnessSignature2] = useState('');
  const [isOpenWitnessModal1, setIsOpenWitnessModal1] = useState(false);
  const [isOpenWitnessModal2, setIsOpenWitnessModal2] = useState(false);

  // Estados dos materiais – cada item possui: material, quantity e serial (se necessário)
  const [materiais, setMateriais] = useState([
    { material: '', quantity: '0', serial: '' },
  ]);
  const [materiaisDefeito, setMateriaisDefeito] = useState([
    { material: '', quantity: '0', serial: '' },
  ]);

  const [anexos, setAnexos] = useState<
    {
      id_fechamento: string;
      id_tipo_img: number;
      arquivo_base64: string;
      latitude: number;
      longitude: number;
      precisao_gps: number;
    }[]
  >([]);
  const [products, setProducts] = useState<any[]>([]);
  const [roles, setRoles] = useState<Roles>();
  const [optionsProduct, setOptionsProduct] = useState<string[]>([]);
  // Estado para armazenar erros dos campos que não estão no react-hook-form
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Cria as opções do select a partir do array de produtos (formato "codigo - descrição")
  useEffect(() => {
    if (products?.length > 0) {
      const dataOptions = products.flatMap(
        (item: {
          produtos: {
            codigo?: string;
            descricao: string;
            serializado?: string;
          }[];
        }) =>
          item.produtos.map(
            (produto: any) => `${produto.codigo} - ${produto.descricao}`
          )
      );
      setOptionsProduct(dataOptions);
    }
  }, [products]);

  // Função que monta os arrays de materiais (e defeito) no formato esperado pela API
  const handleCloseOS = async () => {
    const mappedMateriais = materiais.map((item) => {
      const [codigo] = item.material.split(' - ');
      const grupoObj = products.find((grupoObj) =>
        grupoObj.produtos.some((prod: any) => prod.codigo === codigo.trim())
      );
      const prod = grupoObj?.produtos.find(
        (prod: any) => prod.codigo === codigo.trim()
      );
      let materialObj: any = {
        grupo: grupoObj ? grupoObj.grupo : '',
        codigo: Number(codigo),
        quantidade: parseInt(item.quantity) || 1,
      };
      if (prod && prod.serializado?.toUpperCase() === 'S') {
        materialObj.seriais = [item.serial];
      }
      return materialObj;
    });

    const mappedMateriaisDefeito = materiaisDefeito.map((item) => {
      const [codigo] = item.material.split(' - ');
      const grupoObj = products.find((grupoObj) =>
        grupoObj.produtos.some((prod: any) => prod.codigo === codigo.trim())
      );
      const prod = grupoObj?.produtos.find(
        (prod: any) => prod.codigo === codigo.trim()
      );
      let materialObj: any = {
        grupo: grupoObj ? grupoObj.grupo : '',
        codigo: Number(codigo),
        quantidade: parseInt(item.quantity) || 1,
      };
      if (prod && prod.serializado?.toUpperCase() === 'S') {
        materialObj.seriais = [item.serial];
      }
      return materialObj;
    });

    const payload = {
      id_os: data?.id_os,
      id_usr: user?.id,
      latitude: -3.0894758,
      longitude: -60.0697712,
      nao_aufabetizado: beneficiarioNaoAlfabetizado ? 'S' : 'N',
      autorizado_por: {
        proprio_beneficiente: beneficiarioAutorizou ? 'S' : 'N',
        documento: getValues('cpf'),
        nome: nome,
        dta_nascimento: getValues('aniversario'),
        tipo_documento: 'CPF',
      },
      materiais: mappedMateriais,
      materiais_defeito: mappedMateriaisDefeito,
      imagens: {
        assinatura: assinado,
        foto_documento: {
          frente: '',
          verso: '',
        },
        assinatura_t01: witnessSignature1,
        assinatura_t02: witnessSignature2,
      },
      dta_hra_inicio_atendimento: '23/01/2025 10:37:09',
      dta_hra_fim_atendimento: '23/01/2025 10:42:58',
      dados_aparelho: '{...}',
      dados_conexao: 'S',
      modo_aviao: 'N',
      dados_moveis: 'UNKNOWN',
      latitude_inicio: -3.0892878770828247,
      longitude_inicio: -60.069610476493835,
    };

    // Envia a OS e obtém o idFechamento
    const returnData = await fetchCloseOS({
      setLoading,
      id_parceiro: user?.id_entidade,
      payload,
    });
    setIdFechamento(returnData?.id_fechamento);

    if (returnData?.id_fechamento) {
      await Promise.all(
        anexos.map((item) => {
          const evidencePayload = {
            ...item,
            id_fechamento: returnData.id_fechamento,
          };
          return fetchEvidenciasOS({
            id_parceiro: user?.id_entidade,
            setLoading,
            payload: evidencePayload,
          });
        })
      );
    }

    setSuccess(true);
  };

  useEffect(() => {
    const getProdutos = async () =>
      await fetchProducts({
        setLoading: () => {},
        id_project: data?.id_projeto,
        id_os: data?.id_os,
        setProducts,
        setRoles,
      });
    getProdutos();
  }, [data?.id_projeto, data?.id_os]);

  const addMaterial = () => {
    setMateriais([...materiais, { material: '', quantity: '0', serial: '' }]);
  };

  const removeMaterial = (index: number) => {
    setMateriais(materiais.filter((_, i) => i !== index));
  };

  const addMaterialDefeito = () => {
    setMateriaisDefeito([
      ...materiaisDefeito,
      { material: '', quantity: '0', serial: '' },
    ]);
  };

  const removeMaterialDefeito = (index: number) => {
    setMateriaisDefeito(materiaisDefeito.filter((_, i) => i !== index));
  };

  const handleAddQualification = async (uri: string, id: number) => {
    const base64Image = await uriToBase64(uri);
    setAnexos((prev) => [
      ...prev,
      {
        id_fechamento: idFechamento,
        id_tipo_img: id,
        arquivo_base64: base64Image,
        latitude: -3.0894676,
        longitude: -60.0697457,
        precisao_gps: 14,
      },
    ]);
  };

  useEffect(() => {
    if (beneficiarioNaoAlfabetizado) {
      setBeneficiarioAutorizou(false);
    }
  }, [beneficiarioNaoAlfabetizado, beneficiarioAutorizou]);

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        cpf: yup.string().required('CPF é obrigatório'),
        aniversario: yup.string().required('Data de nascimento é obrigatória'),
      })
    ),
    mode: 'onBlur',
  });

  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [imageViewingSource, setImageViewingSource] = useState<
    { uri: string }[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Validação de todos os campos obrigatórios
  const handleConfirm = async () => {
    let validationErrors: { [key: string]: string } = {};

    if (!nome.trim()) {
      validationErrors.nome = 'Nome é obrigatório';
    }

    const cpfVal = getValues('cpf');
    if (!cpfVal || !cpfVal.trim()) {
      validationErrors.cpf = 'CPF é obrigatório';
    }
    const aniversarioVal = getValues('aniversario');
    if (!aniversarioVal.trim()) {
      validationErrors.aniversario = 'Data de nascimento é obrigatória';
    }

    if (roles?.assinatura?.toUpperCase() === 'S' && !assinado.trim()) {
      validationErrors.assinado = 'Assinatura é obrigatória';
    }

    // Validação dos materiais
    if (optionsProduct.length > 0) {
      materiais.forEach((item, index) => {
        if (!item.material || item.material.trim() === '') {
          validationErrors[`materiais_${index}`] = 'Material é obrigatório';
        }
        if (!item.quantity || parseInt(item.quantity) <= 0) {
          validationErrors[`materiaisQuantity_${index}`] =
            'Quantidade deve ser maior que 0';
        }
        if (item.material.trim()) {
          const [codigo] = item.material.split(' - ');
          const grupoObj = products.find((grupoObj) =>
            grupoObj.produtos.some((prod: any) => prod.codigo === codigo.trim())
          );
          const prod = grupoObj?.produtos.find(
            (prod: any) => prod.codigo === codigo.trim()
          );
          if (
            prod &&
            prod.serializado?.toUpperCase() === 'S' &&
            !item.serial.trim()
          ) {
            validationErrors[`serial_${index}`] =
              'Serial é obrigatório para este material';
          }
        }
      });
    }

    if (temTroca) {
      materiaisDefeito.forEach((item, index) => {
        if (!item.material || item.material.trim() === '') {
          validationErrors[`materiaisDefeito_${index}`] =
            'Material com defeito é obrigatório';
        }
        if (!item.quantity || parseInt(item.quantity) <= 0) {
          validationErrors[`materiaisDefeitoQuantity_${index}`] =
            'Quantidade deve ser maior que 0';
        }
        if (item.material.trim()) {
          const [codigo] = item.material.split(' - ');
          const grupoObj = products.find((grupoObj) =>
            grupoObj.produtos.some((prod: any) => prod.codigo === codigo.trim())
          );
          const prod = grupoObj?.produtos.find(
            (prod: any) => prod.codigo === codigo.trim()
          );
          if (
            prod &&
            prod.serializado?.toUpperCase() === 'S' &&
            !item.serial.trim()
          ) {
            validationErrors[`serialDefeito_${index}`] =
              'Serial é obrigatório para este material com defeito';
          }
        }
      });
    }

    // Validação dos anexos
    if (roles?.imagens) {
      roles.imagens.forEach((img) => {
        if (img.obrigatorio.toUpperCase() === 'S') {
          const found = anexos.find((a) => a.id_tipo_img === img.id);
          if (!found) {
            validationErrors[`anexo_${img.id}`] =
              `Anexo de ${img.descricao} é obrigatório`;
          }
        }
      });
    }

    // Validação das assinaturas das testemunhas, se aplicável
    if (roles?.testemunhas?.toUpperCase() === 'S') {
      if (!witnessSignature1.trim()) {
        validationErrors.witnessSignature1 =
          'Assinatura da Testemunha 1 é obrigatória';
      }
      if (!witnessSignature2.trim()) {
        validationErrors.witnessSignature2 =
          'Assinatura da Testemunha 2 é obrigatória';
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    } else {
      setFormErrors({});
      await handleCloseOS();
    }
  };

  return (
    <Container title={`Fechamento OS ${data?.id_os}`} scrollEnabled hasGoBack>
      <View>
        <Button
          variant="secondary"
          text="Ver ordem de serviço"
          style={{ height: 48 }}
          onPress={() => navigation.goBack()}
        />

        <View style={styles.mainDiv}>
          <Spacer size="medium" />

          {/* Dados de quem está autorizando */}
          <ExpandableCard title="Dados de quem está autorizando">
            <SwitchOption
              value={beneficiarioNaoAlfabetizado}
              onValueChange={() => {
                if (beneficiarioAutorizou) {
                  setBeneficiarioNaoAlfabetizado(!beneficiarioNaoAlfabetizado);
                  setBeneficiarioAutorizou(false);
                } else {
                  setBeneficiarioNaoAlfabetizado(!beneficiarioNaoAlfabetizado);
                }
              }}
              children={
                <Typograph variant="body" color={theme.colors.text.primary}>
                  O beneficiário é{' '}
                  <Text style={{ fontWeight: '600' }}>não alfabetizado?</Text>
                </Typograph>
              }
            />
            <SwitchOption
              value={beneficiarioAutorizou}
              onValueChange={() => {
                if (beneficiarioNaoAlfabetizado) {
                  setBeneficiarioNaoAlfabetizado(false);
                  setBeneficiarioAutorizou(!beneficiarioAutorizou);
                } else {
                  setBeneficiarioAutorizou(!beneficiarioAutorizou);
                }
              }}
              children={
                <Typograph variant="body" color={theme.colors.text.primary}>
                  O beneficiário é quem está autorizando?
                </Typograph>
              }
            />
            <Spacer size="medium" />
            <View>
              <Typograph variant="caption" color="black">
                Nome de quem está autorizando:
              </Typograph>
              <Input name="nome" value={nome} onChangeText={setNome} />
              {formErrors.nome && (
                <Text style={styles.errorText}>{formErrors.nome}</Text>
              )}
            </View>
            <Spacer size="medium" />
            <View>
              <Typograph variant="caption" color="black">
                CPF:
              </Typograph>
              <Input control={control} name="cpf" mask={Masks.BRL_CPF} />
              {errors.cpf && (
                <Text style={styles.errorText}>{errors.cpf.message}</Text>
              )}
              {formErrors.cpf && (
                <Text style={styles.errorText}>{formErrors.cpf}</Text>
              )}
            </View>
            <Spacer size="medium" />
            <View>
              <Typograph variant="caption" color="black">
                Data de nascimento:
              </Typograph>
              <Input
                name="aniversario"
                control={control}
                value={aniversario}
                mask={Masks.DATE_DDMMYYYY}
                onChangeText={(it) => {
                  const numericValue = it.replace(/\D/g, '');
                  let formattedValue = numericValue;
                  if (numericValue.length > 2) {
                    formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
                  }
                  if (numericValue.length > 4) {
                    formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
                  }
                  setAniversario(formattedValue);
                }}
              />
              {errors.aniversario && (
                <Text style={styles.errorText}>
                  {errors.aniversario.message}
                </Text>
              )}
              {formErrors.aniversario && (
                <Text style={styles.errorText}>{formErrors.aniversario}</Text>
              )}
            </View>
            <Spacer size="medium" />
          </ExpandableCard>

          <Spacer size="medium" />

          {/* Tem troca */}
          <ExpandableCard title="Tem troca?">
            <SwitchOption
              value={temTroca}
              onValueChange={setTemTroca}
              children={
                <Typograph variant="body" color={theme.colors.text.primary}>
                  Tem troca?
                </Typograph>
              }
            />
          </ExpandableCard>

          {/* Materiais */}
          {optionsProduct.length > 0 && (
            <>
              <Spacer size="medium" />
              <ExpandableCard title="Materiais">
                {materiais.map((item, index) => {
                  let showSerialInput = false;
                  if (item.material.trim()) {
                    const [codigo] = item.material.split(' - ');
                    const grupoObj = products.find((grupoObj) =>
                      grupoObj.produtos.some(
                        (prod: any) => prod.codigo === codigo.trim()
                      )
                    );
                    const prod = grupoObj?.produtos.find(
                      (prod: any) => prod.codigo === codigo.trim()
                    );
                    if (prod && prod.serializado?.toUpperCase() === 'S') {
                      showSerialInput = true;
                    }
                  }
                  return (
                    <View key={index}>
                      <View style={styles.itemRow}>
                        <SelectWithQuantity
                          options={optionsProduct}
                          value={item}
                          onChange={(newItem) => {
                            const newMateriais = [...materiais];
                            newMateriais[index].material =
                              newItem.material || newItem;
                            newMateriais[index].serial = '';
                            setMateriais(newMateriais);
                          }}
                          mediumSize={materiais.length > 1}
                        />
                        {materiais.length > 1 && (
                          <TouchableOpacity
                            onPress={() => removeMaterial(index)}
                          >
                            <AntDesign name="close" size={18} color="black" />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={styles.itemRow}>
                        <Input
                          name={`quantity-${index}`}
                          value={item.quantity}
                          onChangeText={(text) => {
                            const newMateriais = [...materiais];
                            newMateriais[index].quantity = text;
                            setMateriais(newMateriais);
                          }}
                          placeholder="Quantidade"
                        />
                      </View>
                      {showSerialInput && (
                        <View style={styles.itemRow}>
                          <Input
                            name={`serial-${index}`}
                            value={item.serial}
                            onChangeText={(text) => {
                              const newMateriais = [...materiais];
                              newMateriais[index].serial = text;
                              setMateriais(newMateriais);
                            }}
                            placeholder="Informe o serial"
                          />
                          {formErrors[`serial_${index}`] && (
                            <Text style={styles.errorText}>
                              {formErrors[`serial_${index}`]}
                            </Text>
                          )}
                        </View>
                      )}
                      {formErrors[`materiais_${index}`] && (
                        <Text style={styles.errorText}>
                          {formErrors[`materiais_${index}`]}
                        </Text>
                      )}
                      {formErrors[`materiaisQuantity_${index}`] && (
                        <Text style={styles.errorText}>
                          {formErrors[`materiaisQuantity_${index}`]}
                        </Text>
                      )}
                    </View>
                  );
                })}
                <TouchableOpacity
                  onPress={addMaterial}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Adicionar Material</Text>
                </TouchableOpacity>
              </ExpandableCard>
            </>
          )}

          {/* Materiais com defeito */}
          {temTroca && (
            <>
              <Spacer size="medium" />
              <ExpandableCard title="Materiais com defeito">
                {materiaisDefeito.map((item, index) => {
                  let showSerialInput = false;
                  if (item.material.trim()) {
                    const [codigo] = item.material.split(' - ');
                    const grupoObj = products.find((grupoObj) =>
                      grupoObj.produtos.some(
                        (prod: any) => prod.codigo === codigo.trim()
                      )
                    );
                    const prod = grupoObj?.produtos.find(
                      (prod: any) => prod.codigo === codigo.trim()
                    );
                    if (prod && prod.serializado?.toUpperCase() === 'S') {
                      showSerialInput = true;
                    }
                  }
                  return (
                    <View key={index}>
                      <View style={styles.itemRow}>
                        <SelectWithQuantity
                          options={['aqui']} // ou as opções específicas para defeito
                          value={item}
                          onChange={(newItem) => {
                            const newMateriaisDefeito = [...materiaisDefeito];
                            newMateriaisDefeito[index].material =
                              newItem.material || newItem;
                            newMateriaisDefeito[index].serial = '';
                            setMateriaisDefeito(newMateriaisDefeito);
                          }}
                          mediumSize={materiaisDefeito.length > 1}
                        />
                        {materiaisDefeito.length > 1 && (
                          <TouchableOpacity
                            onPress={() => removeMaterialDefeito(index)}
                          >
                            <AntDesign name="close" size={20} color="black" />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={styles.itemRow}>
                        <Input
                          name={`quantity-defeito-${index}`}
                          value={item.quantity}
                          onChangeText={(text) => {
                            const newMateriaisDefeito = [...materiaisDefeito];
                            newMateriaisDefeito[index].quantity = text;
                            setMateriaisDefeito(newMateriaisDefeito);
                          }}
                          placeholder="Quantidade"
                        />
                      </View>
                      {showSerialInput && (
                        <View style={styles.itemRow}>
                          <Input
                            name={`serial-defeito-${index}`}
                            value={item.serial}
                            onChangeText={(text) => {
                              const newMateriaisDefeito = [...materiaisDefeito];
                              newMateriaisDefeito[index].serial = text;
                              setMateriaisDefeito(newMateriaisDefeito);
                            }}
                            placeholder="Informe o serial"
                          />
                          {formErrors[`serialDefeito_${index}`] && (
                            <Text style={styles.errorText}>
                              {formErrors[`serialDefeito_${index}`]}
                            </Text>
                          )}
                        </View>
                      )}
                      {formErrors[`materiaisDefeito_${index}`] && (
                        <Text style={styles.errorText}>
                          {formErrors[`materiaisDefeito_${index}`]}
                        </Text>
                      )}
                      {formErrors[`materiaisDefeitoQuantity_${index}`] && (
                        <Text style={styles.errorText}>
                          {formErrors[`materiaisDefeitoQuantity_${index}`]}
                        </Text>
                      )}
                    </View>
                  );
                })}
                <TouchableOpacity
                  onPress={addMaterialDefeito}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>
                    Adicionar Material com defeito
                  </Text>
                </TouchableOpacity>
                <Spacer size="medium" />
              </ExpandableCard>
            </>
          )}

          {/* Assinatura do autorizador */}
          {roles?.assinatura?.toUpperCase() === 'S' && (
            <>
              <Spacer size="medium" />
              <ExpandableCard title="Assinatura">
                <TouchableOpacity
                  style={styles.assinaturaRow}
                  onPress={() => {
                    assinado.length ? setAssinado('') : setIsOpenModal(true);
                  }}
                >
                  {assinado.length ? (
                    <AntDesign
                      name="checksquare"
                      size={18}
                      color={theme.colors.primary.quaternary}
                    />
                  ) : (
                    <View style={styles.checkboxEmpty} />
                  )}
                  <Typograph variant="body" color={theme.colors.text.primary}>
                    Li e aceito os Termos de aceite
                  </Typograph>
                </TouchableOpacity>
                {formErrors.assinado && (
                  <Text style={styles.errorText}>{formErrors.assinado}</Text>
                )}
              </ExpandableCard>
            </>
          )}

          {/* Assinaturas das testemunhas */}
          {roles?.testemunhas?.toUpperCase() === 'S' && (
            <>
              <Spacer size="medium" />
              <ExpandableCard title="Assinaturas das Testemunhas">
                <TouchableOpacity
                  style={styles.assinaturaRow}
                  onPress={() => {
                    witnessSignature1.length
                      ? setWitnessSignature1('')
                      : setIsOpenWitnessModal1(true);
                  }}
                >
                  {witnessSignature1.length ? (
                    <AntDesign
                      name="checksquare"
                      size={18}
                      color={theme.colors.primary.quaternary}
                    />
                  ) : (
                    <View style={styles.checkboxEmpty} />
                  )}
                  <Typograph variant="body" color={theme.colors.text.primary}>
                    Assinatura Testemunha 1
                  </Typograph>
                </TouchableOpacity>
                {formErrors.witnessSignature1 && (
                  <Text style={styles.errorText}>
                    {formErrors.witnessSignature1}
                  </Text>
                )}
                <Spacer size="medium" />
                <TouchableOpacity
                  style={styles.assinaturaRow}
                  onPress={() => {
                    witnessSignature2.length
                      ? setWitnessSignature2('')
                      : setIsOpenWitnessModal2(true);
                  }}
                >
                  {witnessSignature2.length ? (
                    <AntDesign
                      name="checksquare"
                      size={18}
                      color={theme.colors.primary.quaternary}
                    />
                  ) : (
                    <View style={styles.checkboxEmpty} />
                  )}
                  <Typograph variant="body" color={theme.colors.text.primary}>
                    Assinatura Testemunha 2
                  </Typograph>
                </TouchableOpacity>
                {formErrors.witnessSignature2 && (
                  <Text style={styles.errorText}>
                    {formErrors.witnessSignature2}
                  </Text>
                )}
              </ExpandableCard>
            </>
          )}

          <Spacer size="medium" />

          {/* Anexos */}
          <ExpandableCard title="Anexos">
            <Spacer size="medium" />
            {roles?.imagens?.map((item) => {
              const selected = anexos.find((it) => item.id === it.id_tipo_img);
              return (
                <React.Fragment key={item.id}>
                  <ExpandableCardPhotos title={item.descricao}>
                    <Typograph>{item.exemplo}</Typograph>
                    <Spacer size="medium" />
                    {item.exemplo_url && (
                      <TouchableOpacity
                        onPress={() => {
                          setImageViewingSource([{ uri: item.exemplo_url }]);
                          setCurrentImageIndex(0);
                          setIsImageViewerVisible(true);
                        }}
                      >
                        <Image
                          source={{ uri: item.exemplo_url }}
                          style={{
                            width: '100%',
                            minHeight: 200,
                            borderRadius: 5,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                    <Spacer size="medium" />
                    {selected ? (
                      <ImageUploader
                        fileName={`${item.descricao}`}
                        onDeletePress={() =>
                          setAnexos((prev) =>
                            prev.filter((q) => q.id_tipo_img !== item.id)
                          )
                        }
                        onPress={() => {
                          setImageViewingSource([
                            {
                              uri: `data:image/jpeg;base64,${selected.arquivo_base64}`,
                            },
                          ]);
                          setCurrentImageIndex(0);
                          setIsImageViewerVisible(true);
                        }}
                      />
                    ) : (
                      <DownloadFile
                        iconType="file"
                        label="Anexar arquivo"
                        selectedImage={''}
                        setSelectedImage={(uri: any) => {
                          handleAddQualification(uri, item?.id);
                        }}
                        onlyCam={item.pode_camera?.toUpperCase() === 'S'}
                      />
                    )}
                    {formErrors[`anexo_${item.id}`] && (
                      <Text style={styles.errorText}>
                        {formErrors[`anexo_${item.id}`]}
                      </Text>
                    )}
                  </ExpandableCardPhotos>
                  <Spacer size="medium" />
                </React.Fragment>
              );
            })}
          </ExpandableCard>
          <ImageViewing
            images={imageViewingSource}
            imageIndex={currentImageIndex}
            visible={isImageViewerVisible}
            onRequestClose={() => setIsImageViewerVisible(false)}
          />
          <Spacer size="medium" />
        </View>

        <Button
          variant="quaternary"
          text="Finalizar e enviar"
          style={{ height: 48 }}
          onPress={() => setIsOpenModalConfirmation(true)}
        />

        {/* Modal de confirmação */}
        {isOpenModalConfirmation && (
          <Modal
            visible={isOpenModalConfirmation}
            onRequestClose={() => setIsOpenModalConfirmation(false)}
            transparent
            animationType="fade"
          >
            <View style={styles.modalBackground}>
              {success ? (
                <View
                  style={{
                    width: '90%',
                    backgroundColor: '#08875D',
                    borderRadius: 20,
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    gap: 16,
                  }}
                >
                  <View style={{ position: 'absolute', top: 12, right: 12 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsOpenModalConfirmation(false);
                        setSuccess(false);
                        navigation.goBack();
                      }}
                    >
                      <AntDesign name="close" color="#fff" size={18} />
                    </TouchableOpacity>
                  </View>
                  <AntDesign name="checkcircleo" color="#FFF" size={32} />
                  <View>
                    <Typograph
                      color="#fff"
                      variant="title"
                      style={{ fontWeight: '600' }}
                    >
                      Sucesso
                    </Typograph>
                    <Typograph color="#fff">
                      Ordem de serviço finalizada.
                    </Typograph>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: '90%',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                  }}
                >
                  <Spacer size="large" />
                  <View>
                    <Text style={styles.modalTitle}>Finalizar OS</Text>
                    <Spacer size="small" />
                    <Text style={styles.modalText}>
                      Você tem certeza que deseja finalizar a ordem de serviço
                      abaixo?
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginTop: 12,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}
                    >
                      OS {data?.numero_os}
                    </Text>
                  </View>
                  <Spacer size="large" />
                  <View style={styles.modalButtonsRow}>
                    <Button
                      halfWidth
                      variant="secondary"
                      text="Cancelar"
                      onPress={() => setIsOpenModalConfirmation(false)}
                    />
                    <Button
                      halfWidth
                      text="Confirmar"
                      variant="quaternary"
                      onPress={handleConfirm}
                    />
                  </View>
                </View>
              )}
            </View>
          </Modal>
        )}

        {/* Modal para assinatura do autorizador */}
        {isOpenModal && (
          <Modal
            visible={isOpenModal}
            onRequestClose={() => setIsOpenModal(false)}
            transparent
            animationType="fade"
          >
            {isSignature ? (
              <View style={{ flex: 1 }}>
                <SignatureScreen
                  onClose={() => {
                    setIsSignature(false);
                    setIsOpenModal(false);
                  }}
                  setSignatureData={setAssinado}
                />
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setIsSignature(false);
                    setIsOpenModal(false);
                  }}
                >
                  <AntDesign name="close" size={32} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <Spacer size="large" />
                  <View>
                    <Text style={styles.modalTitle}>Termos de aceite</Text>
                    <Spacer size="small" />
                    <Text style={styles.modalText}>
                      Aceite os termos para continuar
                    </Text>
                  </View>
                  <Spacer size="large" />
                  <View style={styles.termosContainer}>
                    <ScrollView style={{ flex: 1 }} />
                  </View>
                  <Spacer size="large" />
                  <View style={styles.modalButtonsRow}>
                    <Button
                      halfWidth
                      variant="secondary"
                      text="Cancelar"
                      onPress={() => setIsOpenModal(false)}
                    />
                    <Button
                      halfWidth
                      text="Aceitar"
                      variant="quaternary"
                      onPress={() => setIsSignature(true)}
                    />
                  </View>
                </View>
              </View>
            )}
          </Modal>
        )}

        {isOpenWitnessModal1 && (
          <Modal
            visible={isOpenWitnessModal1}
            onRequestClose={() => setIsOpenWitnessModal1(false)}
            transparent
            animationType="fade"
          >
            <View style={{ flex: 1 }}>
              <SignatureScreen
                onClose={() => setIsOpenWitnessModal1(false)}
                setSignatureData={setWitnessSignature1}
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setIsOpenWitnessModal1(false)}
              >
                <AntDesign name="close" size={32} />
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        {/* Modal para assinatura da Testemunha 2 */}
        {isOpenWitnessModal2 && (
          <Modal
            visible={isOpenWitnessModal2}
            onRequestClose={() => setIsOpenWitnessModal2(false)}
            transparent
            animationType="fade"
          >
            <View style={{ flex: 1 }}>
              <SignatureScreen
                onClose={() => setIsOpenWitnessModal2(false)}
                setSignatureData={setWitnessSignature2}
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setIsOpenWitnessModal2(false)}
              >
                <AntDesign name="close" size={32} />
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </Container>
  );
};

export default OSClose;

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'white',
  },
  mainDiv: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  childrenContainer: {
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  switchStyle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  fileCard: {
    marginVertical: theme.spacing.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#0aa',
  },
  divider: {
    marginTop: 4,
    height: 1,
    backgroundColor: '#ccc',
  },
  selectWithQuantityContainer: {
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  addButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: theme.colors.primary.quaternary,
    fontSize: 16,
  },
  assinaturaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkboxEmpty: {
    borderRadius: 4,
    width: 20,
    height: 20,
    borderWidth: 1,
  },
  clearButton: {
    position: 'absolute',
    top: 80,
    right: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
  },
  termosContainer: {
    width: '95%',
    height: '70%',
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
