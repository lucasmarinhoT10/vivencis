import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';

import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';
import Input from '@components/Input';

import { projectDetailsMock } from 'src/mocks/projectMock';
import { useNavigation, useRoute } from '@react-navigation/native';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import OrderButton from '@components/OrderButton';
import { ListCardProjects } from '@components/ListCardProjects';
import {
  fetchProjectDetail,
  subscribeProject,
} from '../services/project.services';
import { CardDetailsProjects } from '@components/CardDetailsProjects';
import Button from '@components/Button';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CertificationCard from '@components/CertificationsList';
import { certificationMock } from 'src/mocks/certificationMock';
import { ModalConfirmation } from '@components/Modal';
import useOrdersStore from 'src/store/ordersStore';
import useUserStore from 'src/store/userStore';

type DetailsProjectsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;
interface Projeto {
  data_execucao: string;
  data_limite_execucao: string;
  descricao_projeto: string;
  icone_projeto: string;
  id_projeto: number;
  nome_projeto: string;
  pre_requisitos: string[];
  tipo_servico: string;
  valor_total: number;
}

export default function DetailsProjectsScreen(props: any) {
  const [data, setData] = useState<Projeto>();
  const [loading, setLoading] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const { orders } = useOrdersStore();
  const { user } = useUserStore();
  const navigation = useNavigation<DetailsProjectsScreenNavigationProp>();
  const getProject = async () => {
    await fetchProjectDetail({
      id_project: props?.route?.params?.projectId,
      setProject: setData,
      setLoading,
    });
  };
  useEffect(() => {
    getProject();
  }, [props?.route?.params?.projectId]);
  const route = useRoute();
  const homeLogged = route.params;
  const projects = route.params;

  const [routeName] = useState(homeLogged?.screenName);

  const [modal, setModal] = useState(false);

  const toggleModal = async () => {
    const response = await subscribeProject({
      setLoading: setLoadingSub,
      id_project: data?.id_projeto,
      payload: {
        id_parceiro: user?.id_entidade,
        id_usuario: user?.id,
      },
    });
    if (response?.erro) {
      alert(response?.erro);
      setModal((prev) => !prev);
    } else {
      setModal((prev) => !prev);
      toggleSecondModal();
    }
  };

  const [secondModal, setSecondModal] = useState(false);
  const [modalNoCertified, setModalNoCertified] = useState(false);

  const toggleSecondModal = () => {
    setSecondModal((prev) => !prev);
  };
  const toggleModalNoCertified = () => {
    setModalNoCertified((prev) => !prev);
  };
  console.log(routeName);

  const handleNavigateToAssignTechnician = (projectId: string) => {
    const selectedProject = projectDetailsMock.find(
      (project) => project.id === projectId
    );
    if (selectedProject) {
      navigation.navigate('AssignTechnician', {
        osNumber: selectedProject.header.osNumber,
      });
    }
  };
  const handlePress = () => {
    console.log('Botão pressionado!');
  };
  return (
    <Container
      scrollEnabled
      title={data?.nome_projeto}
      hasGoBack
      spacerVertical="small"
    >
      {loading ? (
        <ActivityIndicator size={'large'} style={{ marginTop: 120 }} />
      ) : (
        <View>
          <CardDetailsProjects
            header={{
              name: `${data?.nome_projeto}`,
            }}
            data={data}
            highlightLastItem={true}
          />

          {data && data?.pre_requisitos.length > 0 && (
            <>
              <Spacer size="medium" />
              <Typograph variant="title" fontWeight="500" style={styles.title}>
                Pré-requisitos necessários
              </Typograph>
              <View>
                {data?.pre_requisitos.map((certification) => (
                  <View key={certification} style={{ marginBottom: 16 }}>
                    <CertificationCard title={certification} />
                  </View>
                ))}
              </View>
            </>
          )}

          <Spacer size="medium" />
          <Typograph variant="title" fontWeight="500" style={styles.title}>
            Serviços envolvidos
          </Typograph>
          <Typograph variant="options" fontWeight="400" style={styles.service}>
            - {data?.tipo_servico}
          </Typograph>
          <Spacer size="extraLarge" />
          <Typograph variant="title" fontWeight="500" style={styles.title}>
            Remessa
          </Typograph>
          <Spacer size="small" />
          <Button
            text="Remessa de projeto"
            style={{
              height: 76,
              backgroundColor: theme.colors.primary.quaternary,
            }}
            variant="quinary"
            left={() => <Feather name="box" size={20} color="white" />}
            right={() => (
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                style={{ marginLeft: 100 }}
                color="white"
              />
            )}
            onPress={() => {
              navigation.navigate('Remessas', {
                screen: 'Shipments',
                params: { id: data?.id_projeto },
              });
            }}
          />
          <Spacer size="medium" />
          {orders &&
          orders?.filter((it) => it?.id_projeto === data?.id_projeto)?.length >
            0 ? (
            <Typograph variant="title" fontWeight="500" style={styles.title}>
              Ordens de serviço
            </Typograph>
          ) : (
            <Typograph
              variant="title"
              textAlign="center"
              fontWeight="500"
              style={styles.title}
            >
              Nenhuma ordem de serviço disponivel
            </Typograph>
          )}
          {orders?.filter((it) => it.id_projeto === data?.id_projeto)
            .length && (
            <>
              <View style={styles.orderButton}>
                {/* <OrderButton
              text="Ordenar"
              onPress={handlePress}
              iconName="chevron-small-down"
              iconLibrary="Entypo"
              size="medium"
              color={theme.colors.secondary.contrastText}
            /> */}
                {/* <OrderButton
              text="Filtros"
              onPress={handlePress}
              iconName="sliders"
              iconLibrary="FontAwesome"
              size="small"
              color={theme.colors.secondary.contrastText}
            /> */}
              </View>
              <Input
                showSearchIcon
                name="Buscar ordens de serviço"
                placeholder="Buscar ordens de serviço"
              />
            </>
          )}
          <Spacer size="medium" />
          <Spacer size="medium" />
          {orders
            ?.filter((it) => it.id_projeto === data?.id_projeto)
            ?.map((item, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                <ListCardProjects
                  header={{
                    osNumber: `${item.numero_os}`,
                    hasAlert: true,
                    onOptionsPress: () => {},
                  }}
                  data={item}
                  onPress={() =>
                    navigation.navigate('OSDetails' as never, item)
                  }
                />
              </View>
            ))}
          {typeof routeName === 'string' && routeName === 'HomeLogged' && (
            <Button
              onPress={() => setModal(true)}
              style={{ height: 48, marginBottom: 52 }}
              variant="quinary"
              text="Inscrever no projeto"
              fontWeight="600"
            />
          )}
        </View>
      )}

      <ModalConfirmation
        visible={modal}
        title={'Inscrição em projeto'}
        subtitle={'Você tem certeza que quer se inscrever no projeto abaixo?'}
        icon={false}
        isConfirm={true}
        footerTitle={data?.nome_projeto}
        onClose={() => setModal(false)}
        onConfirm={(date, time, observation) => {
          toggleModal();
        }}
        cancelText="Cancelar"
      />

      <ModalConfirmation
        visible={secondModal}
        hasBottom={true}
        title={'Inscrição em análise'}
        subtitle={`Nosso time irá analizar a sua inscrição no ${data?.nome_projeto}. Enquanto isso, leia sobre as boas práticas de como realizar uma OS.`}
        onClose={toggleSecondModal}
        onConfirm={(date, time, observation) => {
          toggleSecondModal();
          navigation.goBack();
        }}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: theme.spacing.extraSmall,
    paddingVertical: theme.spacing.doubleMedium,
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewText: {
    width: '100%',
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 16,
  },
  service: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  orderButton: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 600,
  },
});
