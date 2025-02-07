import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@theme/theme';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import Button from '@components/Button';
import Toast from 'react-native-toast-message';
import { recoverPassword } from '../../services/recover.services';
import useAuthStore from 'src/store/authStore';

interface StepOneProps {
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export function StepOne({ setStep, setLoading, loading }: StepOneProps) {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const { tokenTemp } = useAuthStore();

  const handleSendCode = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, insira um email válido.',
      });
      return;
    }
    setLoading(true);
    try {
      await recoverPassword({
        email,
        tokenTemp: tokenTemp ?? '',
      });
      Toast.show({
        type: 'success',
        text1: 'Código Enviado',
        text2: 'Um código foi enviado para seu email.',
      });
      navigation.navigate('RecoverPassword', { email });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Ocorreu um erro ao enviar o código.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.viewText}>
        <Spacer size="medium" />
        <Typograph
          fontWeight="400"
          variant="body"
          textAlign="left"
          color={theme.colors.text.onTertiary}
        >
          Insira seu email de cadastro abaixo para enviarmos a sua senha.
        </Typograph>
      </View>
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
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
      />
      <Spacer size="extraLarge" />
      <Button
        text="Enviar código"
        style={{ height: theme.sizes.extralarge }}
        variant="quaternary"
        onPress={handleSendCode}
        loading={loading}
      />
      <Button
        text="Cancelar"
        style={styles.button}
        variant="tertiary"
        onPress={() => navigation.goBack()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 14,
  },
  viewText: {
    width: '100%',
  },
  image: {
    width: 280,
    height: 280,
  },
  button: {
    marginTop: 10,
    height: theme.sizes.extralarge,
    color: theme.colors.primary.quaternary,
  },
});
