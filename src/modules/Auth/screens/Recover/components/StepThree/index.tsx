import React from 'react';
import Typograph from '@components/Typograph';
import { Image, StyleSheet, View } from 'react-native';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import Button from '@components/Button';
import { theme } from '@theme/theme';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootDrawerParamList } from '@routes/routes';

interface StepThreeProps {
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}
interface PropsForm {
  passOne: string;
  passTwo: string;
}

type StepThreeNavigationProp = BottomTabNavigationProp<RootDrawerParamList>;
export function StepThree({ setStep, setLoading, loading }: StepThreeProps) {
  const navigation = useNavigation<StepThreeNavigationProp>();
  return (
    <>
      <Spacer size={'extraLarge'} />
      <Spacer size={'small'} />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{ width: 280, height: 300 }}
          source={require('@assets/images/ConfirmedCuate.png')}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.viewText}>
        <Typograph
          fontWeight="600"
          variant="title"
          textAlign="left"
          color={theme.colors.primary.main}
        >
          Código de verificação Confirmado
        </Typograph>
        <Spacer size={'medium'} />
      </View>
      <Spacer size="medium" />

      <Spacer size="medium" />
      <Button
        variant="primary"
        text="Avançar"
        style={{
          height: theme.sizes.extralarge,
          backgroundColor: theme.colors.primary.main,
        }}
        onPress={() => navigation.navigate('SignIn')}
      />
      <Spacer size="large" />
      <Button
        variant="primary"
        color={theme.colors.primary.main}
        text="Reenviar código"
        style={{
          height: theme.sizes.extralarge,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary.main,
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
