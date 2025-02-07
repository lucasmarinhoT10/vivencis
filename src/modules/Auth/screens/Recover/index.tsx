import Container from '@components/Container';
import React, { useState } from 'react';
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { StepThree } from './components/StepThree';
import { useNavigation } from '@react-navigation/native';

const RecoverScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1); // Estado com valores válidos: 1, 2, 3

  const navigation = useNavigation();

  const showStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            setStep={setStep}
            setLoading={setLoading}
            loading={loading}
          />
        );
      case 2:
        return (
          <StepTwo
            setStep={setStep}
            setLoading={setLoading}
            loading={loading}
          />
        );
      case 3:
        return (
          <StepThree
            setStep={setStep}
            setLoading={setLoading}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container
      handlerPrimary={() => {
        if (step === 1) {
          navigation.navigate('SignIn' as never);
        } else {
          setStep((prevStep) =>
            prevStep > 1 ? ((prevStep - 1) as 1 | 2 | 3) : prevStep
          );
        }
      }}
      hasGoBack
      title={'Recuperação de senha'}
    >
      {showStep()}
    </Container>
  );
};

export default RecoverScreen;
