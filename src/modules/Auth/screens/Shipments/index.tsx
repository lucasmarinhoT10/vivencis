import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { Modal, StyleSheet, View } from 'react-native';

import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';

import Spacer from '@components/Spacer';
import { ListCardShipments } from '@components/ListCardShipments';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootDrawerParamList } from '@routes/routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Button from '@components/Button';
import { acceptedRemessa, fetchShipments } from './services/shipments.services';
import useUserStore from 'src/store/userStore';
import useShipmentsStore from 'src/store/shipmentsStore';
import { RemessaProps } from 'src/store/Models/Shipments';
import OrderButton from '@components/OrderButton';
import ShipmentsFilterModal, {
  FilterCriteriaShip,
} from '@components/ShipmentsFilterModal';
import { PaginationControls } from '@components/Pagination';

type ShipmentsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ShipmentsScreen(props: any) {
  const id_project = props.route?.params?.id ?? undefined;
  const { user } = useUserStore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteriaShip>();

  const { setShipments, shipments, setLoading, loading } = useShipmentsStore();
  const navigation = useNavigation<ShipmentsScreenNavigationProp>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [id_remessa, setId_remessa] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getShipments = async () => {
    await fetchShipments({
      id_parceiro: user?.id_entidade,
      setLoading,
      setShipments,
      status: filterCriteria?.status,
      id_projeto: filterCriteria?.id_projeto,
      perPage: 10,
      currentPage,
    });
  };

  useEffect(() => {
    getShipments();
  }, [filterCriteria, currentPage, id_project]);
  useEffect(() => {
    setFilterCriteria({
      ...filterCriteria,
      id_projeto: props.route?.params?.id,
    });
  }, [props.route?.params?.id]);

  const handleAcceptShipment = async () => {
    await acceptedRemessa({
      setLoading,
      id_remessa,
      id_user: user?.id,
    });

    await getShipments();
    setShowSuccessModal(false);
    setId_remessa(undefined);
  };
  const handlePressFilters = () => {
    setFilterModalVisible(true);
  };
  const handleApplyFilters = (criteria: any) => {
    setFilterCriteria(criteria);
    setFilterModalVisible(false);
  };

  const handleNextPage = () => {
    if (shipments && currentPage < shipments.paginas) {
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
      scrollEnabled
      spacerVertical="small"
      title="Ordens de Remessa"
      hasGoBack
    >
      <View>
        {!showSuccessModal && (
          <>
            <Typograph
              variant="semiTitle"
              fontWeight="700"
              style={styles.title}
            >
              Inventário
            </Typograph>
            <Spacer size="medium" />
            <Button
              text="Inventário"
              style={{
                height: 70,
                backgroundColor: theme.colors.primary.quaternary,
              }}
              variant="quinary"
              left={() => <Feather name="box" size={20} color="white" />}
              right={() => (
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  style={{ marginLeft: '70%' }}
                  color="white"
                />
              )}
              onPress={() => navigation.navigate('Inventory')}
            />
            <Spacer size="medium" />
            <OrderButton
              text="Filtros"
              onPress={handlePressFilters}
              iconName="sliders"
              iconLibrary="FontAwesome"
              size="small"
              color={theme.colors.secondary.contrastText}
            />
            <Spacer size="medium" />

            {shipments?.remessas && shipments?.remessas?.length <= 0 && (
              <Typograph textAlign="center" style={{ marginTop: 100 }}>
                Nenhuma remessa foi encontrada
              </Typograph>
            )}
            {shipments?.remessas?.map((shipment: RemessaProps) => (
              <View key={shipment.id_remessa} style={{ marginBottom: 16 }}>
                <ListCardShipments
                  header={{
                    osNumber: `${shipment.identificador}`,
                    hasAlert: false,
                    onOptionsPress: () =>
                      alert(`Opções pressionadas para OS ${'shipment.id'}`),
                  }}
                  data={shipment}
                  highlightFirstItem={true}
                  menuOptions={[
                    {
                      text: 'Ver Detalhes',
                      onPress: () =>
                        navigation.navigate(
                          'ShipmentsDetails' as never,
                          shipment
                        ),
                    },
                    {
                      text: 'Aceitar',
                      onPress: () => {
                        setId_remessa(shipment?.id_remessa);
                        setShowSuccessModal(true);
                      },
                    },
                  ]}
                />
              </View>
            ))}

            {shipments && shipments?.paginas > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={shipments?.paginas}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
              />
            )}
          </>
        )}
        <ShipmentsFilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={handleApplyFilters}
          filters={filterCriteria}
        />
        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.cardSucess}>
              <Ionicons name="checkmark-circle" size={64} color="#1EAD68" />
              <Spacer size="small" />
              <Typograph fontWeight="600" style={styles.titleSucess}>
                Confirmaremos o recebimento da Remessa
              </Typograph>
              <Spacer size="medium" />
              <Typograph style={styles.subtitle}>
                Você recebeu a remessa?
              </Typograph>
              <Spacer size="large" />
              <Button
                style={{ height: theme.sizes.extralarge }}
                text="Confirmar Recebimento"
                variant="secondary"
                onPress={handleAcceptShipment}
              />
              <Spacer size="medium" />
              <Button
                style={{ height: theme.sizes.extralarge }}
                text="Voltar"
                variant="tertiary"
                onPress={() => setShowSuccessModal(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.primary.placeholder,
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleSucess: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },

  containerSucess: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardSucess: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: theme.colors.primary.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
});
