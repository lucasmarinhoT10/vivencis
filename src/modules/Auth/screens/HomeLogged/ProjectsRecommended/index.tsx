import React, { useCallback, useEffect, useState } from 'react';
import Container from '@components/Container';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ProjectCard from '@components/ProjectCard';
import OrderButton from '@components/OrderButton';
import useProjectsStore from 'src/store/projectsStore';
import useUserStore from 'src/store/userStore';
import useOrdersStore from 'src/store/ordersStore';
import { FilterModal } from '@components/FilterModal/Index';
import { PaginationOrders } from 'src/store/Models/Orders';
import useTechniciansStore from 'src/store/techniciansStore';
import { PaginationControls } from '@components/Pagination';
import { fetchTechnicians } from '../../ManageTechnicians/services/technicians.services';
import { fetchProjects } from '../../Projects/services/project.services';
import Input from '@components/Input';
import ProjectFilterModal, {
  FilterCriteria,
} from '@components/ProjectFilterModal';
import { ProjectData } from 'src/store/Models/Project';
import useLocationStore from 'src/store/useLocationStore';

type ProjectsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;
export default function ProjectsRecommendedScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    tipo: '',
    projeto: '',
    status: '',
    tecnico: '',
    data: '',
  });
  const handlePressFilters = () => {
    setFilterModalVisible(true);
  };
  const [paginationOrders, setPaginationOrders] = useState<PaginationOrders>();
  const [regionProjectsList, setRegionProjectsList] = useState<ProjectData[]>(
    []
  );
  const [loadingRegion, setLoadingRegion] = useState(false);

  const { setTechnicians } = useTechniciansStore();

  const navigation = useNavigation<ProjectsScreenNavigationProp>();
  const { user } = useUserStore();
  const handleProjectPress = ({
    projectId,
    inscrito,
  }: {
    projectId: number;
    inscrito: string;
  }) => {
    navigation.navigate('DetailsProjects' as never, {
      id: projectId,
      inscrito: inscrito,
    });
  };
  const [address, setAddress] = useState<{ uf: string; cidade: string }>({
    uf: '',
    cidade: '',
  });
  const { location } = useLocationStore();

  const handleNextPage = () => {
    if (paginationOrders && currentPage < paginationOrders.paginas) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const getRegionProjectsList = async (
    uf: string,
    cidade: string,
    filters?: FilterCriteria
  ) => {
    if (!user?.id_entidade) return;
    setLoadingRegion(true);
    await fetchProjects({
      UF: uf,
      cidade: cidade,
      setProjects: setRegionProjectsList,
      setLoading: setLoadingRegion,
      id_parceiro: user?.id_entidade,
      filters,
    });
  };
  const getAddressFromCoords = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const addresses = await Location.reverseGeocodeAsync(coords);
      if (addresses.length > 0) {
        const { region, city } = addresses[0];
        setAddress({ uf: region || '', cidade: city || '' });
      }
    } catch (error) {
      console.error('Erro no reverse geocoding', error);
    }
  };
  useEffect(() => {
    if (location) {
      getAddressFromCoords(location);
    }
  }, [location]);

  useEffect(() => {
    if (address.uf && address.cidade) {
      getRegionProjectsList(address.uf, address.cidade);
    }
  }, [address]);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getRegionProjectsList(address.uf, address.cidade);
    }, [])
  );
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
  const handleApplyFilters = (criteria: FilterCriteria) => {
    setFilterCriteria(criteria);
    if (address.uf && address.cidade) {
      getRegionProjectsList(address.uf, address.cidade, criteria);
    }
    setFilterModalVisible(false);
  };

  if (loadingRegion) {
    return (
      <Container>
        <Typograph variant="title">Olá, {user?.nome}</Typograph>
        <Spacer size="medium" />
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </Container>
    );
  }

  return (
    <Container
      scrollEnabled
      spacerVertical="small"
      title="Projetos Recomendados"
      sizeText={18}
    >
      <View style={styles.orderButton}>
        <OrderButton
          text="Filtros"
          onPress={handlePressFilters}
          iconName="sliders"
          iconLibrary="FontAwesome"
          size="small"
          color={theme.colors.secondary.contrastText}
        />
      </View>
      <Input
        showSearchIcon
        name="Buscar em projetos disponíveis"
        placeholder="Buscar em projetos disponíveis"
        onChangeText={(e) => {
          setFilterCriteria({
            ...filterCriteria,
            projeto: e,
          });
        }}
        value={filterCriteria.projeto}
      />
      <Spacer size="small" />
      {loadingRegion ? (
        <ActivityIndicator style={{ marginTop: 120 }} />
      ) : (
        <View>
          {regionProjectsList?.length ? (
            regionProjectsList?.map((project) => (
              <ProjectCard
                key={project.id_projeto}
                title={project.nome_projeto}
                startDate={project.data_execucao}
                endDate={project.data_limite_execucao}
                description={project.descricao_projeto}
                onPress={() =>
                  handleProjectPress({
                    projectId: project?.id_projeto,
                    inscrito: project?.inscrito,
                  })
                }
              />
            ))
          ) : (
            <>
              {loadingRegion ? (
                <ActivityIndicator />
              ) : (
                <Typograph textAlign="center" style={{ marginTop: 80 }}>
                  Não há projetos disponiveis
                </Typograph>
              )}
            </>
          )}

          <Spacer size="medium" />
          {paginationOrders && paginationOrders.paginas > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={paginationOrders.paginas}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          )}
        </View>
      )}
      <ProjectFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
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
  orderButton: {
    flexDirection: 'row',
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
    gap: 8,
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
