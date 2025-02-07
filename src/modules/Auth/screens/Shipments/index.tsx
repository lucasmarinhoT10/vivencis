import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { Modal, StyleSheet, View } from 'react-native';

import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';

import MultiSelector from '@components/MultiSelector';
import Spacer from '@components/Spacer';
import { ListCardShipments } from '@components/ListCardShipments';
import shipmentsMock from 'src/mocks/shipments';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootDrawerParamList } from '@routes/routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@components/Button';
import SelectDrop from '@components/SelectDrop';
import { fetchShipments } from './services/shipments.services';
import useUserStore from 'src/store/userStore';
import useShipmentsStore from 'src/store/shipmentsStore';
import { RemessaProps } from 'src/store/Models/Shipments';
import Input from '@components/Input';

type ShipmentsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ShipmentsScreen(props: any) {
  const id_project = props.route?.params?.id ?? undefined;
  const { user } = useUserStore();
  const { setShipments, shipments, setLoading, loading } = useShipmentsStore();
  const [selectedOption, setSelectedOption] = useState<string>('option1');
  const navigation = useNavigation<ShipmentsScreenNavigationProp>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const getShipments = async () => {
    await fetchShipments({
      id_parceiro: user?.id_entidade,
      setLoading,
      setShipments,
    });
  };

  useEffect(() => {
    getShipments();
  }, []);
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setCurrentStep(1);
  };
  const optionsSelect = ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'];
  const optionsNavigate = [
    { label: 'Todos', value: 'option1' },
    { label: 'Pendente', value: 'option2' },
    { label: 'Recebida', value: 'option3' },
  ];
  const data = id_project
    ? shipments?.remessas?.filter((it) => it.id_projeto === id_project)
    : shipments?.remessas;

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
            <MultiSelector
              options={optionsNavigate}
              selected={selectedOption}
              setSelected={setSelectedOption}
            />

            <Spacer size="large" />
            <Input showSearchIcon name="" placeholder="Pesquisar" />

            <Spacer size="large" />
            {data?.map((shipment: RemessaProps) => (
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
                      onPress: () => setShowSuccessModal(true),
                    },
                  ]}
                />
              </View>
            ))}
          </>
        )}
        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="fade"
          onRequestClose={closeSuccessModal}
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
                onPress={() => setShowSuccessModal(false)}
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
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
