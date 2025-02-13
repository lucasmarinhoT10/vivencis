import React, { useCallback, useEffect, useState } from 'react';
import Container from '@components/Container';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ProjectCard from '@components/ProjectCard';
import OrderButton from '@components/OrderButton';
import { ListCardProjects } from '@components/ListCardProjects';
import { fetchOrders, fetchProjects } from './services/project.services';
import useProjectsStore from 'src/store/projectsStore';
import useUserStore from 'src/store/userStore';
import useOrdersStore from 'src/store/ordersStore';
import { FilterModal } from '@components/FilterModal/Index';
import { getStatus } from '../SignIn/services/login.services';
import { PaginationOrders } from 'src/store/Models/Orders';
import useTechniciansStore from 'src/store/techniciansStore';
import { fetchTechnicians } from '../ManageTechnicians/services/technicians.services';
import { PaginationControls } from '@components/Pagination';
import Input from '@components/Input';
import { useDebounce } from '@services/useDebounce';

type ProjectsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ProjectsScreen() {
  const [filterModal, setFilterModal] = useState(false);
  const [idTec, setIdTec] = useState(0);
  const [status, setStatus] = useState('');
  const [filter, setFilter] = useState<{
    projeto: string;
    tecnico: string;
    grupo_status: string;
    filter_os: string;
  }>({ projeto: '', tecnico: '', grupo_status: '', filter_os: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const [osSearch, setOsSearch] = useState('');

  const debouncedOsSearch = useDebounce(osSearch, 500);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      filter_os: debouncedOsSearch,
    }));
  }, [debouncedOsSearch]);

  const onClose = () => setFilterModal(false);
  const openFilterModal = () => setFilterModal(true);

  const { projects, setProjects, loading, setLoading } = useProjectsStore();
  const [paginationOrders, setPaginationOrders] = useState<PaginationOrders>();
  const itemsProject = projects?.map((item) => item.nome_projeto);
  const { setTechnicians, technicians } = useTechniciansStore();

  const {
    orders,
    setOrders,
    loading: loadingOrders,
    setLoading: setLoadingOrders,
  } = useOrdersStore();
  const navigation = useNavigation<ProjectsScreenNavigationProp>();
  const { user } = useUserStore();

  const handleProjectPress = (projectId: number) => {
    navigation.navigate('DetailsProjects' as never, { projectId });
  };

  const handleNextPage = () => {
    if (paginationOrders && currentPage < paginationOrders.paginas) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getProjects = async () => {
    await fetchProjects({
      setProjects,
      setLoading,
      id_parceiro: user?.id_entidade,
    });
  };

  const getOrders = async () => {
    if (!filter.filter_os) {
      setLoadingOrders(true);
    }
    await fetchOrders({
      setOrders,
      setLoading: setLoadingOrders,
      setPaginationOrders,
      id_parceiro: user?.id_entidade,
      id_tecnico:
        technicians?.find((it) => it?.nome === filter?.tecnico)?.id ?? 0,
      perPage: 5,
      currentPage,
      filter: {
        ...filter,
        projeto: projects?.find((it) => it?.nome_projeto === filter?.projeto)
          ?.id_projeto,
      },
    });
    if (!filter.filter_os) {
      setLoadingOrders(false);
    }
  };

  const getStatusData = async () => {
    const status = await getStatus({
      id_parceiro: user?.id_entidade,
    });
    setStatus(status?.status_analise);
  };

  const getTechnicians = async () => {
    await fetchTechnicians({
      id_parceiro: user?.id_entidade,
      setLoading: () => {},
      setTechnicians,
    });
  };

  useEffect(() => {
    getTechnicians();
  }, []);

  useEffect(() => {
    getProjects();
    getStatusData();
  }, [user?.id_entidade]);

  useEffect(() => {
    if (user?.id_entidade) {
      getOrders();
    }
  }, [user?.id_entidade, currentPage, idTec, filter]);
  useFocusEffect(
    useCallback(() => {
      getProjects();
    }, [])
  );
  return (
    <Container
      scrollEnabled
      spacerVertical="small"
      title="Meus projetos ativos"
      sizeText={18}
    >
      {loading ? (
        <ActivityIndicator style={{ marginTop: 120 }} />
      ) : (
        <View>
          {projects?.length ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id_projeto}
                title={project.nome_projeto}
                startDate={project.data_execucao}
                endDate={project.data_limite_execucao}
                description={project.descricao_projeto}
                onPress={() => handleProjectPress(project.id_projeto)}
              />
            ))
          ) : (
            <>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Typograph>Não há projetos disponiveis</Typograph>
              )}
            </>
          )}

          <Spacer size="medium" />
          <Typograph variant="title" fontWeight="500" style={styles.title}>
            Ordens de serviço
          </Typograph>
          <View style={styles.orderButton}>
            <OrderButton
              text="Filtros"
              onPress={openFilterModal}
              iconName="sliders"
              iconLibrary="FontAwesome"
              size="small"
              color={theme.colors.secondary.contrastText}
            />
            {/* Input para buscar pelo número da OS */}
            <Input
              showSearchIcon
              name="Número da OS"
              placeholder="Número da OS"
              onChangeText={(text) => setOsSearch(text)}
              value={osSearch}
              keyboardType="numeric"
            />
            <Spacer size="small" />
          </View>

          {filterModal && (
            <FilterModal
              filter={filter}
              setFilter={setFilter}
              onClose={onClose}
              title="Filtros"
              visible={true}
              itemsSelect={itemsProject}
              technicians={technicians}
            />
          )}

          <Spacer size="medium" />
          {loadingOrders ? (
            <ActivityIndicator />
          ) : orders?.length ? (
            orders.map((item, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                <ListCardProjects
                  header={{
                    osNumber: `${item.numero_os}`,
                    hasAlert: false,
                    onOptionsPress: () => {},
                  }}
                  data={item}
                  onPress={() => {
                    navigation.navigate('OSDetails' as never, item);
                  }}
                />
              </View>
            ))
          ) : (
            <Typograph style={{ marginTop: 20 }} textAlign="center">
              {filter?.projeto || filter?.tecnico || filter?.grupo_status
                ? 'Não há ordens de serviço disponiveis nos filtros que selecionou!'
                : 'Não há ordens de serviço disponíveis.'}
            </Typograph>
          )}

          {!loadingOrders &&
            paginationOrders &&
            paginationOrders.paginas > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={paginationOrders.paginas}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
              />
            )}
        </View>
      )}
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
    fontSize: 16,
  },
  orderButton: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: theme.spacing.small,
    justifyContent: 'space-around',
  },
  customButtonText: {
    color: theme.colors.secondary.contrastText,
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.medium,
  },
  paginationButton: {
    backgroundColor: theme.colors.primary.gray,
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: theme.colors.primary.border,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButtonText: {
    color: theme.colors.primary.labelValue,
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: theme.colors.primary.border,
    opacity: 0.5,
  },
  pageIndicator: {
    fontSize: 16,
  },
});
