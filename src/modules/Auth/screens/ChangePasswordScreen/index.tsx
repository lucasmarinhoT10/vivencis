import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Container from '@components/Container';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import Button from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { theme } from '@theme/theme';
import Toast from 'react-native-toast-message';

import { schemaChangePassword } from './services/change-password.schema';
import { changePassword } from './services/change-password.services';
import useAuthStore from 'src/store/authStore';

interface FormData {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePasswordScreen() {
  const { tokenTemp } = useAuthStore();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaChangePassword as any),
    mode: 'onBlur',
    defaultValues: {
      email: route?.params?.email,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await changePassword({
        email: data.email,
        senha_old: data.currentPassword,
        senha_new: data.newPassword,
        tokenTemp: tokenTemp ?? '',
      });
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Senha redefinida com sucesso!',
      });
      navigation.popToTop();
    } catch (error) {
      console.error('Erro ao trocar senha:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Ocorreu um erro ao redefinir a senha.',
      });
    }
  };

  // Exibir apenas o primeiro erro entre newPassword e confirmNewPassword
  const errorMessage =
    errors.newPassword?.message || errors.confirmNewPassword?.message;

  return (
    <Container
      handlerPrimary={() => navigation.goBack()}
      hasGoBack
      title="Trocar Senha"
    >
      <View style={styles.content}>
        <Spacer size="medium" />
        <Typograph
          variant="body"
          textAlign="left"
          fontWeight="400"
          color={theme.colors.text.onTertiary}
        >
          Insira sua nova senha e confirme-a.
        </Typograph>
        <Spacer size="large" />

        {/* Input para Email (sem validação) */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name="email"
              placeholder="Digite seu email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              // Não exibe erro para email
            />
          )}
        />
        <Spacer size="medium" />

        {/* Input para Senha Atual (sem validação) */}
        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name="currentPassword"
              placeholder="Digite sua senha atual"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              // Não exibe erro para senha atual
            />
          )}
        />
        <Spacer size="medium" />

        {/* Input para Nova Senha */}
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name="newPassword"
              placeholder="Digite sua nova senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.newPassword?.message}
            />
          )}
        />
        <Spacer size="medium" />

        {/* Input para Confirmar Nova Senha */}
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name="confirmNewPassword"
              placeholder="Confirme sua nova senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmNewPassword?.message}
            />
          )}
        />
        <Spacer size="extraLarge" />

        <Button
          text="Redefinir Senha"
          variant="quaternary"
          style={{ height: 54 }}
          onPress={handleSubmit(onSubmit)}
        />

        {/* Exibe a mensagem de erro (apenas uma) abaixo do botão */}
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Typograph style={styles.errorText}>{errorMessage}</Typograph>
          </View>
        )}

        <Spacer size="medium" />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Typograph
            variant="options"
            textAlign="center"
            fontWeight="600"
            color={theme.colors.primary.link}
          >
            Cancelar
          </Typograph>
        </TouchableOpacity>
      </View>
      <Spacer size="extraLarge" />
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.small,
  },
  errorContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.error.main,
    fontSize: 12,
  },
});

export default ChangePasswordScreen;
