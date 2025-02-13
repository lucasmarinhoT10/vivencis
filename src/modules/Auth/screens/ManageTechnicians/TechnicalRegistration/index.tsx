import Container from '@components/Container';

import { theme } from '@theme/theme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

type RegisterDocumentScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

const TechnicalRegistrationScreen: React.FC = (props: any) => {
  const navigation = useNavigation<RegisterDocumentScreenNavigationProp>();
  const [step, setStep] = useState(props?.route?.params?.isEdit ? 3 : 1);
  const [data, setData] = useState<any>(props?.route?.params);
  console.log('aqui', props?.route?.params);
  const showStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            setDataRegister={setData}
            setStep={setStep}
            step={step}
            dataRegister={data}
          />
        );
      case 2:
        return (
          <StepTwo
            setDataRegister={setData}
            setStep={setStep}
            step={step}
            dataRegister={data}
          />
        );
      case 3:
        return (
          <StepThree
            setDataRegister={setData}
            setStep={setStep}
            step={step}
            dataRegister={data}
          />
        );
      default:
        return (
          <StepOne
            setDataRegister={setData}
            setStep={setStep}
            step={step}
            dataRegister={data}
          />
        );
    }
  };
  return (
    <Container
      scrollEnabled
      title={
        props?.route?.params?.isEdit ? 'Editar Técnico' : 'Cadastro de Técnico'
      }
      hasGoBack
      handlerPrimary={() => {
        if (step === 2) {
          setStep(step - 1);
        } else {
          navigation.goBack();
        }
      }}
    >
      <View style={styles.content}>{showStep()}</View>
    </Container>
  );
};

export default TechnicalRegistrationScreen;
const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: theme.spacing.extraSmall,
  },

  title: {
    paddingLeft: theme.spacing.extraSmall,
    fontSize: 16,
  },
  fileCard: {
    marginVertical: theme.spacing.small,
  },
  button: {
    marginTop: 90,
    height: theme.sizes.extralarge,
  },
});
