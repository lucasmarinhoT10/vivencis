import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { StyleSheet, View } from 'react-native';

import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { ProjectStatusDetailsCard } from '@components/ProjectStatusDetailsCard';
import { OSCardInfo } from '@components/OSCardInfo';
import Button from '@components/Button';
import { OSCardInfoSecondary } from '@components/OSCasdInfoSecondary';

type ExtractsDetailsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ExtractsDetailsScreen(props: any) {
  const [secondModal, setSecondModal] = useState(false);
  const [modalNoCertified, setModalNoCertified] = useState(false);

  const toggleSecondModal = () => {
    setSecondModal((prev) => !prev);
  };
  const toggleModalNoCertified = () => {
    setModalNoCertified((prev) => !prev);
  };

  const osData = {
    type: 'INSTALAÇÃO',
    state: 'CORRIGIR INSTALAÇÃO',
    internship: 'ANDAMENTO',
    client: 'MARCILENE TAVARES DE MIRANDA',
    neighborhood: 'ZONA RURAL',
    city: 'Araguaína-TO',
    dueDate: '28/09/2024',
    scheduledDate: '25/09/2024',
    technical: 'Nenhum técnico atribuído',
    value: 'R$000,00',
  };
  return (
    <Container
      scrollEnabled
      title={'Extrato 000'}
      hasGoBack
      spacerVertical="small"
    >
      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Detalhes
      </Typograph>

      <Spacer size="small" />

      <ProjectStatusDetailsCard
        data={{
          qrServiceOrder: '00',
          totalValue: 'R$000,00',
          averageValue: 'R$000,00',
          projectInvolved: 'Projeto x',
          status: 'NF não enviada',
        }}
      />

      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Ordens de serviço
      </Typograph>
      <OSCardInfoSecondary title={'OS 7298259'} data={osData} isClient />
      <OSCardInfoSecondary title={'OS 7298259'} data={osData} isClient />
      <OSCardInfoSecondary title={'OS 7298259'} data={osData} isClient />
      <OSCardInfoSecondary title={'OS 7298259'} data={osData} isClient />
      <Spacer size="large" />
      <Button
        variant="quaternary"
        text="Enviar  Nota Fiscal"
        style={{ height: 48 }}
        // onPress={() => navigation.navigate('ManualOSClose' as never, data)}
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
  row: {
    flexDirection: 'row',
    marginBottom: 14,
    justifyContent: 'space-between',
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
