import React from 'react';
import Container from '@components/Container';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Spacer from '@components/Spacer';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';
import Input from '@components/Input';
import Button from '@components/Button';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Device from 'expo-device';
import * as Application from 'expo-application';
import Constants from 'expo-constants';

import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';
import { schemaLogin } from './services/login.schema';
import { delay } from '@utils/delay';
import { login } from './services/login.services';
import useUserStore from 'src/store/userStore';
import useAuthStore from 'src/store/authStore';
import useRegisterStore from 'src/store/useRegisterStore';
interface PropsForm {
  email: string;
  pass: string;
}

const appVersion = Constants.expoConfig?.version || 'UNKNOWN';
export default function SignInScreen() {
  const { setUser, loading, setLoading, removeUser } = useUserStore();
  const { authenticateUser, logoutUser } = useAuthStore();
  const { setRegister } = useRegisterStore();
  const navigation = useNavigation<any>();

  const onSubmit = async (data: PropsForm) => {
    let deviceId = 'UNKNOWN';

    if (Device.osName === 'Android') {
      deviceId = Application.getAndroidId();
    } else if (Device.osName === 'iOS') {
      deviceId = (await Application.getIosIdForVendorAsync()) as string;
    }

    const deviceModel = Device.modelName || 'UNKNOWN';

    const response = await login({
      email: data.email,
      senha: data.pass,
      id_celular: deviceId || 'UNKNOWN',
      modelo_celular: deviceModel || 'UNKNOWN',
      versao_app: appVersion || 'UNKNOWN',

      setUser,
      authenticateUser,
      setLoading,
      setRegister,
    });

    if (response?.success) {
      navigation.navigate('HomeLogged' as never);
    } else if (response?.status === 'EM ANALISE') {
      Alert.alert(
        response?.message,
        'Você terá acesso limitado a algumas funções até a liberação da sua conta'
      );
      navigation.navigate('HomeLogged' as never);
    } else if (response?.status === 'REPROVADO') {
      Alert.alert(response?.message);
      navigation.navigate('SignUp' as never, response);
    } else if (response?.message === 'ResetToken') {
      await delay(500);
      await removeUser();
      await logoutUser();
    } else if (response?.message === 'Erro ao realizar login') {
      setError('email', {
        type: 'manual',
        message: 'Email ou senha incorretos',
      });
      setError('pass', {
        type: 'manual',
        message: 'Email ou senha incorretos',
      });

      Alert.alert(
        response?.message,
        'Verifique se o seu email e senha foram digitados corretamente'
      );
    } else {
      Alert.alert(response?.message || 'Erro inesperado');
    }
  };

  const {
    control,
    formState: { errors },
    trigger,
    handleSubmit,
    setError,
  } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onBlur',
  });
  return (
    <Container>
      <Spacer size="extraLarge" />
      <Spacer size="extraLarge" />
      <View style={styles.containerLogo}>
        <Image source={require('@assets/images/LogoVivensis.png')} />
      </View>
      <Spacer size="large" />
      <View style={styles.content}>
        <Spacer size="medium" />
        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          Email
        </Typograph>

        <Input
          name="email"
          control={control}
          keyboardType="email-address"
          placeholder="Digite seu email"
          error={errors?.email?.message}
        />

        <Spacer size="medium" />
        <Typograph
          variant="title"
          textAlign="left"
          fontWeight="400"
          style={styles.title}
        >
          Senha
        </Typograph>

        <Input
          name="pass"
          secureTextEntry
          error={errors?.pass?.message}
          placeholder="Digite sua senha"
          control={control}
        />

        <Spacer size="medium" />
        <View style={{ width: '100%' }}>
          <View style={styles.link}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Recover' as never)}
            >
              <Typograph
                variant="options"
                fontWeight="600"
                textAlign="right"
                color={theme.colors.primary.link}
              >
                Esqueci minha senha
              </Typograph>
            </TouchableOpacity>
          </View>
        </View>

        <Spacer size="medium" />
        <Button
          text="Entrar"
          style={{ height: theme.sizes.extralarge }}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <Spacer size="medium" />

        <Button
          text="Cadastrar nova conta"
          style={{ height: theme.sizes.extralarge }}
          variant="secondary"
          onPress={() => navigation.navigate('SignUp' as never)}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <Typograph
            variant="options"
            fontWeight="400"
            textAlign="right"
            color={theme.colors.primary.link}
          >
            Versão {appVersion}
          </Typograph>
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  containerLogo: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: theme.spacing.extraSmall,
    flex: 1,
    paddingVertical: theme.spacing.doubleMedium,
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
    fontSize: 14,
  },
  link: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  image: {
    width: 280,
    height: 280,
  },
});
