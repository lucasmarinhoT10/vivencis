import Button from '@components/Button';
import CodeInput from '@components/CodeInput';

import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import React from 'react';
import { StyleSheet } from 'react-native';

interface StepTwoProps {
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}
export function StepTwo({ setStep, setLoading, loading }: StepTwoProps) {
  return (
    <>
      <Spacer size={'medium'} />

      <Typograph
        fontWeight="400"
        variant="body"
        textAlign="left"
        color={theme.colors.text.onTertiary}
      >
        Insira o código que enviamos para o número *****3873
      </Typograph>
      <CodeInput
        numberOfFields={6}
        onCodeComplete={(code) => console.log('Código inserido:', code)}
      />
      <Spacer size="medium" />
      <Button
        variant="quaternary"
        text="Confirmar código"
        style={{
          height: theme.sizes.extralarge,
        }}
        onPress={() => setStep(3)}
      />
      <Spacer size="large" />
      <Button
        variant="tertiary"
        text="Reenviar código"
        style={{
          height: theme.sizes.extralarge,
        }}
        onPress={() => setStep(1)}
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
  viewText: {
    width: '100%',
  },
  image: {
    width: 280,
    height: 280,
  },
});
