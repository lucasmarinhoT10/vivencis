import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { StyleSheet, View } from 'react-native';

import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import OrderButton from '@components/OrderButton';

import Input from '@components/Input';
import { ExtractCard } from '@components/ExtactCard';
import { ProjectStatusCard } from '@components/ProjectStatusCard';
import { useNavigation } from '@react-navigation/native';
import { fetchExtracts } from './services/extracts.services';
import useUserStore from 'src/store/userStore';

type ExtractsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ExtractsScreen(props: any) {
  const [secondModal, setSecondModal] = useState(false);
  const [modalNoCertified, setModalNoCertified] = useState(false);
  const [extracts, setExtracts] = useState<any>();
  const navigation = useNavigation<ExtractsScreenNavigationProp>();
  const { user } = useUserStore();
  const toggleSecondModal = () => {
    setSecondModal((prev) => !prev);
  };
  const toggleModalNoCertified = () => {
    setModalNoCertified((prev) => !prev);
  };
  useEffect(() => {
    const getExtratos = async () => {
      await fetchExtracts({
        setExtracts,
        setLoading: () => {},
        id_parceiro: 1,
        page: 1,
        id_project: 1,
      });
    };

    getExtratos();
  }, []);
  return (
    <Container
      scrollEnabled
      title={'Ver extratos'}
      hasGoBack
      spacerVertical="small"
    >
      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Indicadores
      </Typograph>
      <Spacer size="small" />
      <View style={styles.row}>
        <ExtractCard
          title="Saldo disponível"
          value="R$500,00"
          icon="dollar"
          width={169}
        />
        <ExtractCard
          title="Total ganho"
          value="R$5.000,00"
          icon="hand-holding-dollar"
          width={169}
        />
      </View>
      <ExtractCard
        title="Ordens de serviço concluídas com sucesso"
        value="0000000"
        icon="check"
      />

      <Spacer size="large" />
      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Extratos apurados
      </Typograph>

      <Spacer size="small" />
      <View style={styles.orderButton}>
        <OrderButton
          text="Status"
          onPress={() => console.log('status clicado')}
          iconName="chevron-small-down"
          iconLibrary="Entypo"
          size="medium"
          color={theme.colors.secondary.contrastText}
        />
        <OrderButton
          text="Projetos"
          onPress={() => console.log('projetos clicado')}
          iconName="chevron-small-down"
          iconLibrary="Entypo"
          size="small"
          color={theme.colors.secondary.contrastText}
        />
      </View>
      <Input
        showSearchIcon
        name="Pesquisar status ou projetos"
        placeholder="Buscar em projetos disponíveis"
      />

      <Spacer size="medium" />
      <ProjectStatusCard
        title="Nome do projeto"
        data={{
          dateInitial: 'dd/mm/aaaa',
          endDate: 'dd/mm/aaaa',
          value: 'R$000,00',
          status: 'NF não enviada',
        }}
        onPress={() => navigation.navigate('ExtractsDetails')}
      />

      <ProjectStatusCard
        title="Nome do projeto"
        data={{
          dateInitial: 'dd/mm/aaaa',
          endDate: 'dd/mm/aaaa',
          value: 'R$000,00',
          status: 'NF enviada',
        }}
      />

      <ProjectStatusCard
        title="Nome do projeto"
        data={{
          dateInitial: 'dd/mm/aaaa',
          endDate: 'dd/mm/aaaa',
          value: 'R$000,00',
          status: 'Pago',
        }}
      />
      <ProjectStatusCard
        title="Nome do projeto"
        data={{
          dateInitial: 'dd/mm/aaaa',
          endDate: 'dd/mm/aaaa',
          value: 'R$000,00',
          status: 'Negado',
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
