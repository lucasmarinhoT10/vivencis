import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import Container from '@components/Container';
import { theme } from '@theme/theme';
import ListItem from '@components/ListItem';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import useAuthStore from 'src/store/authStore';
import { useNavigation } from '@react-navigation/native';
import useUserStore from 'src/store/userStore';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootDrawerParamList } from '@routes/routes';
import SuportIcon from '@assets/svgs/Suport';
import useOrdersStore from 'src/store/ordersStore';
import useProjectsStore from 'src/store/projectsStore';
import useShipmentsStore from 'src/store/shipmentsStore';
import useLocationStore from 'src/store/useLocationStore';
import useTechniciansStore from 'src/store/techniciansStore';

type ProfileScreenNavigationProp = BottomTabNavigationProp<RootDrawerParamList>;

export default function ProfileScreen() {
  const { logoutUser } = useAuthStore();
  const { removeUser } = useUserStore();
  const { setOrders } = useOrdersStore();
  const { setProjects } = useProjectsStore();
  const { setShipments } = useShipmentsStore();
  const { setLocation } = useLocationStore();
  const { setTechnicians } = useTechniciansStore();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const handleLogout = async () => {
    try {
      await logoutUser();
      await removeUser();
      setOrders(null);
      setProjects(null);
      setShipments(null);
      setLocation(null);
      setTechnicians(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' as never }],
      });
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  };
  return (
    <Container spacerVertical="small">
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Feather
            name="user"
            size={45}
            color={theme.colors.primary.quaternary}
          />

          <TouchableOpacity style={styles.cameraButton}>
            <Feather
              name="camera"
              size={13}
              color={theme.colors.primary.quaternary}
            />
          </TouchableOpacity>
        </View>
        <Spacer size="extraLarge" />

        {/* <ListItem
          title="Extratos"
          spacerHorizontal="medium"
          left={() => (
            <MaterialIcons
              name="currency-exchange"
              size={24}
              color={theme.colors.primary.title}
            />
          )}
          right={() => (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.primary.title}
            />
          )}
          onPress={() => navigation.navigate('Extracts')}
        /> */}
        <ListItem
          title="Comprovantes de pré-requisito"
          spacerHorizontal="medium"
          left={() => (
            <Octicons
              name="checklist"
              size={24}
              color={theme.colors.primary.title}
            />
          )}
          right={() => (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.primary.title}
            />
          )}
          onPress={() => navigation.navigate('PreRequisiteVoucher')}
        />
        <ListItem
          title="Certificações"
          spacerHorizontal="medium"
          left={() => (
            <MaterialCommunityIcons
              name="file-certificate-outline"
              size={26}
              color={theme.colors.primary.title}
            />
          )}
          right={() => (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.primary.title}
            />
          )}
          onPress={() => navigation.navigate('RegisteredCertifications')}
        />
        <ListItem
          title="Redefinir senha"
          spacerHorizontal="medium"
          left={() => (
            <Octicons name="key" size={24} color={theme.colors.primary.title} />
          )}
          right={() => (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.primary.title}
            />
          )}
          onPress={() => navigation.navigate('RecoverPassword' as never)}
        />
        <ListItem
          title="Falar com suporte"
          spacerHorizontal="medium"
          left={() => <SuportIcon />}
          right={() => (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.primary.title}
            />
          )}
          onPress={() =>
            Linking.openURL(
              'https://api.whatsapp.com/send?phone=554121413032&text=' +
                encodeURIComponent('Olá, possuo uma dúvida')
            )
          }
        />
      </View>
      <View
        style={{
          marginTop: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={handleLogout}>
          <Typograph
            fontWeight="600"
            variant="title"
            color={theme.colors.primary.button}
          >
            Sair
          </Typograph>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 60,

    backgroundColor: '#6DC6E0',

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraButton: {
    width: 24,
    height: 24,
    marginBottom: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    elevation: 3,

    shadowColor: theme.colors.primary.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 2,
  },
});
