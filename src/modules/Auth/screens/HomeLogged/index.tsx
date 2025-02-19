import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import Container from '@components/Container';
import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';
import Input from '@components/Input';
import OrderButton from '@components/OrderButton';
import ProjectCarousel from '@components/ProjectCarousel';
import ProjectCard from '@components/ProjectCard';
import useUserStore from 'src/store/userStore';
import { fetchProjects } from '../Projects/services/project.services';
import useLocationStore from 'src/store/useLocationStore';
import { ProjectData } from 'src/store/Models/Project';
import ProjectFilterModal, {
  FilterCriteria,
} from '@components/ProjectFilterModal';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '@routes/routes';
import { getRegistro } from '../SignIn/services/login.services';
import useRegisterStore from 'src/store/useRegisterStore';
import { getAddressFromCoords } from '@utils/normalilze';

type HomeLoggedScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

function HomeLoggedScreen() {
  const { setRegister } = useRegisterStore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    tipo: '',
    projeto: '',
    status: '',
    tecnico: '',
    data: '',
  });

  const { user } = useUserStore();
  const navigation = useNavigation<HomeLoggedScreenNavigationProp>();

  const [recommendedProjects, setRecommendedProjects] = useState<ProjectData[]>(
    []
  );

  const [regionProjectsList, setRegionProjectsList] = useState<ProjectData[]>(
    []
  );
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const [loadingRegion, setLoadingRegion] = useState(false);

  const [address, setAddress] = useState<{ uf: string; cidade: string }>({
    uf: '',
    cidade: '',
  });

  const { location } = useLocationStore();

  // const getRecommendedProjects = async () => {
  //   if (!user?.id_entidade) return;
  //   setLoadingRecommended(true);
  //   await fetchProjects({
  //     id_parceiro: user.id_entidade,
  //     setProjects: setRecommendedProjects,
  //     setLoading: setLoadingRecommended,
  //     UF: '',
  //     cidade: '',
  //   });
  // };
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

  useEffect(() => {
    if (location) {
      console.log(location);
      getAddressFromCoords(location).then((data) => {
        if (data)
          setAddress({
            uf: data.uf,
            cidade: data.cidade,
          });
      });
    }
  }, [location]);

  useEffect(() => {
    if (address.uf && address.cidade) {
      getRegionProjectsList(address.uf, address.cidade);
    }
  }, [address]);

  useEffect(() => {
    if (address.uf && address.cidade) {
      getRegionProjectsList(address.uf, address.cidade);
    }
  }, [filterCriteria?.projeto]);

  useFocusEffect(
    useCallback(() => {
      getRegionProjectsList(address.uf, address.cidade);
      getRegisterData();
    }, [])
  );
  const handleSeeMore = () => {
    navigation.navigate('ProjectsRecommended' as never);
  };
  const getRegisterData = async () => {
    const data = await getRegistro({ id_parceiro: user?.id_entidade });
    if (data) {
      setRegister(data);
    }
  };
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

  const handlePressFilters = () => {
    setFilterModalVisible(true);
  };

  const handleApplyFilters = (criteria: FilterCriteria) => {
    setFilterCriteria(criteria);
    if (criteria?.uf || criteria?.cidade) {
      getRegionProjectsList(criteria.uf, criteria.cidade, criteria);
    }
    setFilterModalVisible(false);
  };

  if (loadingRecommended || loadingRegion) {
    return (
      <Container>
        <Typograph variant="title">Olá, {user?.nome}</Typograph>
        <Spacer size="medium" />
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </Container>
    );
  }

  return (
    <Container scrollEnabled>
      <Typograph variant="title">Olá, {user?.nome}</Typograph>
      <Spacer size="medium" />

      {/* {recommendedProjects.length > 0 && (
        <ProjectCarousel
          title="Projetos recomendados"
          projects={recommendedProjects ?? []}
          onPress={(id_projeto: any) =>
            handleProjectPress(id_projeto, 'HomeLogged')
          }
          onSeeMore={handleSeeMore}
        />
      )} */}

      {regionProjectsList.length > 0 && (
        <ProjectCarousel
          title="Projetos na sua região"
          projects={regionProjectsList ? regionProjectsList.slice(0, 5) : []}
          onPress={(project) =>
            handleProjectPress({
              projectId: project?.id_projeto,
              inscrito: project?.inscrito,
            })
          }
          onSeeMore={handleSeeMore}
        />
      )}

      <View style={styles.content}>
        <Typograph fontWeight="500" variant="title" style={styles.title}>
          Projetos disponíveis
        </Typograph>
        <View style={styles.orderButton}>
          {/* <OrderButton
            text="Ordenar"
            onPress={handlePress}
            iconName="chevron-small-down"
            iconLibrary="Entypo"
            size="medium"
            color={theme.colors.secondary.contrastText}
          /> */}
          <OrderButton
            text="Filtros"
            onPress={handlePressFilters}
            iconName="sliders"
            iconLibrary="FontAwesome"
            size="small"
            color={theme.colors.secondary.contrastText}
          />
        </View>

        <Spacer size="medium" />

        {regionProjectsList?.length > 0 ? (
          regionProjectsList.map((project) => (
            <ProjectCard
              key={project.id_projeto}
              title={project.nome_projeto}
              startDate={project.data_execucao}
              endDate={project.data_limite_execucao}
              place={`${project?.cidade} - ${project?.uf}`}
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
          <View>
            <Typograph textAlign="center" style={{ marginTop: 30 }}>
              Nenhum projeto disponivel no momento
            </Typograph>
          </View>
        )}
      </View>

      <ProjectFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
      />
      {Platform.OS === 'android' && <Spacer size="extraLarge" />}
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  orderButton: {
    flexDirection: 'row',
  },
});

export default HomeLoggedScreen;
