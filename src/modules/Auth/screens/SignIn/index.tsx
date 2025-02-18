import React, { useState, useEffect } from 'react';
import Container from '@components/Container';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
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
import { useForm } from 'react-hook-form';
import { schemaLogin } from './services/login.schema';
import { delay } from '@utils/delay';
import { login } from './services/login.services';
import useUserStore from 'src/store/userStore';
import useAuthStore from 'src/store/authStore';
import useRegisterStore from 'src/store/useRegisterStore';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<PropsForm>({
    resolver: yupResolver(schemaLogin),
    mode: 'onBlur',
  });
  useEffect(() => {
    const loadRememberedCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('@remembered_email');
        const storedPass = await AsyncStorage.getItem('@remembered_password');
        if (storedEmail && storedPass) {
          setValue('email', storedEmail);
          setValue('pass', storedPass);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Erro ao carregar credenciais do AsyncStorage', error);
      }
    };
    loadRememberedCredentials();
  }, [setValue]);

  // Função para salvar ambos, email e senha, no AsyncStorage
  const handleRememberCredentials = async (email: string, pass: string) => {
    try {
      await AsyncStorage.setItem('@remembered_email', email);
      await AsyncStorage.setItem('@remembered_password', pass);
    } catch (error) {
      console.error('Erro ao salvar email e senha no AsyncStorage', error);
    }
  };

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
      rememberMe,
    });

    if (response?.success) {
      if (rememberMe) {
        await handleRememberCredentials(data.email, data.pass);
      } else {
        await AsyncStorage.removeItem('@remembered_email');
        await AsyncStorage.removeItem('@remembered_password');
      }
      navigation.navigate('HomeLogged' as never);
    } else if (response?.status === 'EM ANALISE') {
      if (response?.data) {
        const isReproved = response?.data?.documentos_qualificacoes?.find(
          (it: any) => it?.status === 'REPROVADO'
        );
        Alert.alert(
          'Cadastro reprovado',
          'Algum documento do seu registro foi reprovado, reenvie um que seja válido.'
        );
        if (isReproved) {
          navigation.navigate('SignUp' as never, response);
          return;
        } else {
          navigation.navigate('HomeLogged' as never);
        }
      } else {
        Alert.alert(
          response?.message,
          'Você terá acesso limitado a algumas funções até a liberação da sua conta'
        );
        navigation.navigate('HomeLogged' as never);
      }
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

  return (
    <Container>
      <ScrollView>
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
          {/* Checkbox para manter login, agora posicionado abaixo da senha */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Feather name="check" size={16} color="#fff" />}
            </View>
            <Typograph
              variant="options"
              fontWeight="400"
              textAlign="left"
              style={styles.checkboxLabel}
            >
              Manter login
            </Typograph>
          </TouchableOpacity>
          <Spacer size="medium" />
          <View style={{ width: '100%' }}>
            <View style={styles.link}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RecoverPassword' as never)}
              >
                <Typograph
                  variant="options"
                  fontWeight="600"
                  textAlign="right"
                  color={theme.colors.primary.main}
                >
                  Trocar senha
                </Typograph>
              </TouchableOpacity>
              <View style={{ marginLeft: 16 }} />
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
      </ScrollView>
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
  title: {
    paddingLeft: theme.spacing.extraSmall,
    fontSize: 14,
  },
  link: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 4,
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
    paddingLeft: theme.spacing.extraSmall,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main,
  },
  checkboxLabel: {
    fontSize: 14,
    color: theme.colors.primary.title,
  },
});
