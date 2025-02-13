import React, { useState } from 'react';
import Container from '@components/Container';
import { Alert, Modal, StyleSheet, View } from 'react-native';

import { theme } from '@theme/theme';
import { ShipmentsList } from '@components/ShipmentsList';
import moment from 'moment';
import Spacer from '@components/Spacer';

import Typograph from '@components/Typograph';
import Button from '@components/Button';
import { Ionicons } from '@expo/vector-icons';
import {
  acceptedRemessa,
  fetchShipments,
} from '../services/shipments.services';
import useUserStore from 'src/store/userStore';
import useShipmentsStore from 'src/store/shipmentsStore';
import { RemessaProps } from 'src/store/Models/Shipments';

export default function ShipmentsDetailsScreen(props: any) {
  const [data, setdata] = useState<RemessaProps>(props.route.params);
  const { user } = useUserStore();
  const { setShipments, shipments } = useShipmentsStore();
  const [isAccepted, setIsAccepted] = useState(data?.status === 'FINALIZADA');
  const [acceptDate, setAcceptDate] = useState(data?.data ?? '');
  const [loading, setLoading] = useState(false);
  const handleAcceptShipment = async () => {
    const response = await acceptedRemessa({
      setLoading,
      id_remessa: data?.id_remessa,
      id_user: user?.id,
    });
    if (response?.success) {
      setIsAccepted(true);
      const today = moment(new Date().getTime()).format('DD/MM/YYYY');
      setAcceptDate(`${today}`);
      setShowSuccessModal(false);
    } else {
      setShowSuccessModal(false);
      Alert?.alert('Erro', response?.erro);
    }

    await getShipments();
  };

  const getShipments = async () => {
    await fetchShipments({
      id_parceiro: user?.id_entidade,
      setLoading,
      setShipments,
      currentPage: props?.route?.params?.currentPage ?? 1,
      perPage: 5,
    });
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <Container
      scrollEnabled
      title="Detalhes da Remessa"
      hasGoBack
      spacerVertical="small"
    >
      <View style={styles.card}>
        <Typograph fontWeight="500" style={styles.subtitle}>
          Dados da remessa
        </Typograph>

        <Spacer size="medium" />
        <View style={styles.itemContainer}>
          <Typograph style={styles.itemLabel}>Projeto</Typograph>
          <Typograph style={styles.itemValue}>{data?.projeto}</Typograph>
        </View>
        <View style={styles.itemContainer}>
          <Typograph style={styles.itemLabel}>Quantidade de items</Typograph>
          <Typograph style={styles.itemValue}>{data?.itens?.length}</Typograph>
        </View>
        <View style={styles.itemContainer}>
          <Typograph style={styles.itemLabel}>Data de envio</Typograph>
          <Typograph style={styles.itemValue}>{data?.data}</Typograph>
        </View>
        <View style={styles.itemContainer}>
          <Typograph style={styles.itemLabel}>Status</Typograph>
          <Typograph style={styles.itemValue}>{data?.status}</Typograph>
        </View>
      </View>

      <Spacer size="medium" />
      <ShipmentsList title="Itens da Remessa" data={data?.itens} />

      <Spacer size="medium" />
      {isAccepted ? (
        <Typograph
          fontWeight="600"
          color={theme.colors.primary.quaternary}
          style={styles.link}
        >
          Remessa aceita em{' '}
          <Typograph fontWeight="600" color={theme.colors.primary.quaternary}>
            {acceptDate}
          </Typograph>
        </Typograph>
      ) : (
        <Button
          style={{ height: theme.sizes.extralarge }}
          text="Aceitar Remessa"
          variant="quaternary"
          onPress={() => setShowSuccessModal(true)}
        />
      )}
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
    </Container>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
    shadowColor: theme.colors.primary.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 10,
    shadowRadius: 3,
    padding: 12,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 16,
  },
  titleSucess: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
  link: {
    textAlign: 'center',
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
  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 22,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  itemLabel: {
    fontSize: 14,
    color: theme.colors.primary.placeholder,
    flex: 1,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.primary.placeholder,
  },
});
