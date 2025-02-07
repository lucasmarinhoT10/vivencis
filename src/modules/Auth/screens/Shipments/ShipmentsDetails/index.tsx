import React, { useState } from 'react';
import Container from '@components/Container';
import { StyleSheet, View } from 'react-native';

import { theme } from '@theme/theme';
import { ShipmentsList } from '@components/ShipmentsList';
import moment from 'moment';
import Spacer from '@components/Spacer';

import Typograph from '@components/Typograph';
import Button from '@components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShipmentsDetailsScreen(props: any) {
  const [data, setdata] = useState(props.route.params);
  const [isAccepted, setIsAccepted] = useState(false);
  const [acceptDate, setAcceptDate] = useState('');

  const handleAcceptShipment = () => {
    setIsAccepted(true);
    const today = moment(new Date().getTime()).format('DD/MM/YYYY');

    setAcceptDate(`${today}`);
  };
  const itemsData = [
    { label: 'Antenas', value1: 103, value2: 135 },
    { label: 'Receptores', value1: 12, value2: 24 },
    { label: 'Item 3', value1: 4, value2: 6 },
    { label: 'Item 4', value1: 0, value2: 8 },
    { label: 'Item 5', value1: 0, value2: 3 },
  ];
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
          onPress={handleAcceptShipment}
        />
      )}
    </Container>
  );
}
const styles = StyleSheet.create({
  card: {
    height: 242,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
    shadowColor: theme.colors.primary.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 10,
    shadowRadius: 3,
  },
  subtitle: {
    textAlign: 'left',
    padding: 20,
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
  },

  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 22,
  },
});
