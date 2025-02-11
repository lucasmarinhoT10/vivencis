import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import {
  ActivityIndicator,
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

type ManageTechniciansScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function ManageTechniciansScreen() {
  const { user } = useUserStore();
  const { setLoading, setTechnicians, technicians, loading } =
    useTechniciansStore();
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
  const navigation = useNavigation<ManageTechniciansScreenNavigationProp>();
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
        <Spacer size="large" />
        {technicians && technicians.length > 0 ? (
          <>
            {loading ? (
              <ActivityIndicator style={{ marginTop: 80 }} />
            ) : (
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
            )}
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
