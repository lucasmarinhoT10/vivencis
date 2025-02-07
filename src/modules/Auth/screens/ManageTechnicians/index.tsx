import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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

import OrderButton from '@components/OrderButton';
import TechnicianCard, {
  Technician,
} from '@components/AssignTechnicianCard/TechnicianCard';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import useUserStore from 'src/store/userStore';
import { fetchTechnicians } from './services/technicians.services';
import useTechniciansStore from 'src/store/techniciansStore';

type ManageTechniciansScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ManageTechniciansScreen() {
  const { user } = useUserStore();
  const { setLoading, setTechnicians, technicians } = useTechniciansStore();
  const getTechnicians = async () => {
    await fetchTechnicians({
      id_parceiro: user?.id_entidade,
      setLoading,
      setTechnicians,
    });
  };

  useEffect(() => {
    getTechnicians();
  }, []);
  const techniciansMock = [
    {
      id: '1',
      name: 'Francisco Fábio Emanuel Sales',
      cpf: '123.456.789-10',
      phone: '12345-6789',
    },
    {
      id: '2',
      name: 'Francisco Fábio Emanuel Sales',
      cpf: '987.654.321-00',
      phone: '98765-4321',
    },
  ];
  const navigation = useNavigation<ManageTechniciansScreenNavigationProp>();
  const route = useRoute();

  const [addTechnical, setAddTechnical] = useState(false);

  useFocusEffect(() => {
    const params = route.params as { addTechnical?: boolean } | undefined;
    setAddTechnical(params?.addTechnical ?? false);
  });

  const handlePress = () => {
    console.log('Botão pressionado!');
  };
  const handleTechnicianSelect = (technician: Technician) => {
    console.log('Selected Technician:', technician);
  };
  return (
    <Container
      spacerVertical="small"
      scrollEnabled
      title="Técnicos cadastrados"
    >
      <View>
        <Spacer size="medium" />

        <View style={styles.orderButton}>
          <OrderButton
            text="Ordenar"
            onPress={handlePress}
            iconName="chevron-small-down"
            iconLibrary="Entypo"
            size="medium"
            color={theme.colors.secondary.contrastText}
          />
          <OrderButton
            text="Filtros"
            onPress={handlePress}
            iconName="sliders"
            iconLibrary="FontAwesome"
            size="small"
            color={theme.colors.secondary.contrastText}
          />
        </View>
        <Spacer size="medium" />
        <Input
          showSearchIcon
          name="Buscar em técnicos"
          placeholder="Buscar em técnicos"
        />
        <Spacer size="large" />
        {technicians && technicians.length > 0 ? (
          <>
            <View>
              <TechnicianCard
                technicians={technicians}
                onTechnicianSelect={handleTechnicianSelect}
              />
              <Spacer size="large" />
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
            </View>
          </>
        ) : (
          <>
            <Typograph fontWeight="400" style={styles.subtitle}>
              Nenhum técnico cadastrado ainda{' '}
            </Typograph>
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
          </>
        )}
      </View>
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
    alignItems: 'center',
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
