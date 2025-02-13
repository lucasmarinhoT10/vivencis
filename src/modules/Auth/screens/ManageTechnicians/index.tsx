import React, { useCallback, useEffect, useState } from 'react';
import Container from '@components/Container';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';
import Input from '@components/Input';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootDrawerParamList } from '@routes/routes';

import TechnicianCard, {
  Technician,
} from '@components/AssignTechnicianCard/TechnicianCard';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import useUserStore from 'src/store/userStore';
import { fetchTechnicians } from './services/technicians.services';
import useTechniciansStore from 'src/store/techniciansStore';
import OrderButton from '@components/OrderButton';
import TechFilterModal, { FilterCriteria } from '@components/TechFilterModal';
import { PaginationControls } from '@components/Pagination';
import { PaginationOrders } from 'src/store/Models/Orders';

type ManageTechniciansScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ManageTechniciansScreen() {
  const { user } = useUserStore();
  const { setLoading, setTechnicians, technicians, loading } =
    useTechniciansStore();
  const [currentPage, setCurrentPage] = useState(1);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    status: '',
    nome: '',
    cpf: '',
  });
  const [pagination, setPagination] = useState<PaginationOrders>();

  const getTechnicians = async () => {
    await fetchTechnicians({
      id_parceiro: user?.id_entidade,
      setLoading,
      setTechnicians,
      filterCriteria,
      setPagination,
      perPage: 5,
      currentPage,
    });
  };
  const handleApplyFilters = (criteria: FilterCriteria) => {
    setFilterCriteria(criteria);
    setFilterModalVisible(false);
  };
  useEffect(() => {
    getTechnicians();
  }, [filterCriteria, currentPage]);
  const navigation = useNavigation<ManageTechniciansScreenNavigationProp>();
  useFocusEffect(
    useCallback(() => {
      getTechnicians();
    }, [])
  );
  const handlePressFilters = () => {
    setFilterModalVisible(true);
  };
  const handlePress = () => {
    setSortModalVisible(true);
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.paginas) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <Container
      spacerVertical="small"
      scrollEnabled
      title="Técnicos cadastrados"
    >
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
      <View>
        <Spacer size="large" />
        {technicians && technicians.length > 0 ? (
          <>
            {loading ? (
              <ActivityIndicator style={{ marginTop: 80 }} />
            ) : (
              <View>
                <View style={styles.link}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TechnicalRegistration' as never)
                    }
                  >
                    <Typograph
                      variant="options"
                      fontWeight="600"
                      textAlign="right"
                      color={theme.colors.primary.link}
                    >
                      Cadastrar novo técnico
                    </Typograph>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={technicians}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={({ item }) => <TechnicianCard data={item} />}
                />
                <Spacer size="large" />
                {technicians.length >= 0 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={pagination?.paginas ?? 1}
                    onNext={handleNextPage}
                    onPrev={handlePrevPage}
                  />
                )}
              </View>
            )}
          </>
        ) : (
          <>
            <Typograph fontWeight="400" style={styles.subtitle}>
              Nenhum técnico cadastrado ainda{' '}
            </Typograph>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TechnicalRegistration' as never)
                }
              >
                <Typograph
                  variant="options"
                  fontWeight="600"
                  textAlign="right"
                  color={theme.colors.primary.link}
                >
                  Cadastrar novo técnico
                </Typograph>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <TechFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.text.description,
  },
  link: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 22,
  },
  orderButton: {
    flexDirection: 'row',
  },
});
