import Container from '@components/Container';
import Icon from '@components/Icon';
import ListItem from '@components/ListItem';
import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Typograph from '@components/Typograph';
import { useNavigation } from '@react-navigation/native';

const InitialScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container title={'Usuários'}>
      <View style={styles.container}>
        <Spacer size={'extraLarge'} />
        <Spacer size={'small'} />
        <View style={styles.container}>
          <Image
            source={require('@assets/images/users.png')}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
        <Spacer size="extraLarge" />
        <View style={styles.viewText}>
          <Typograph
            fontWeight="600"
            variant="title"
            textAlign="left"
            color={theme.colors.primary.main}
          >
            Tipo de usuário
          </Typograph>
          <Spacer size={'medium'} />
          <Typograph
            fontWeight="400"
            variant="body"
            textAlign="left"
            color={theme.colors.text.onTertiary}
          >
            Escolha dentre as opções abaixo a que mais se adequa a sua
            realidade.
          </Typograph>
        </View>
        <Spacer size={'large'} />
        <View style={styles.containerButtons}>
          <ListItem
            spacerVertical={'small'}
            isSignin={'border'}
            title={'Paciente'}
            onPress={() => {
              navigation.navigate('SignIn' as never, {
                typeSelected: 'pacient',
              });
            }}
            right={() => (
              <Icon
                name={'chevron-right'}
                size={'large'}
                color={theme.colors.primary.dark}
              />
            )}
          />
          <Spacer size={'medium'} />
          <ListItem
            spacerVertical="small"
            isSignin={'background'}
            title={'Médico'}
            onPress={() => {
              navigation.navigate('SignIn', { typeSelected: 'medic' });
            }}
            right={() => (
              <Icon
                name={'chevron-right'}
                size={'large'}
                color={theme.colors.text.onPrimary}
              />
            )}
          />
          <Spacer size={'medium'} />
          <ListItem
            spacerVertical={'small'}
            isSignin={'border'}
            onPress={() => {
              navigation.navigate('SignIn' as never, {
                typeSelected: 'receptionist',
              });
            }}
            title={'Recepcionista'}
            right={() => (
              <Icon
                name={'chevron-right'}
                size={'large'}
                color={theme.colors.primary.dark}
              />
            )}
          />
        </View>
      </View>
    </Container>
  );
};

export default InitialScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    width: '100%',
  },
  image: {
    width: 280,
    height: 280,
  },
});
