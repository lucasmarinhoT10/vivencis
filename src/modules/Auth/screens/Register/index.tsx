import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StepOne from './steps/StepOne';
import StepThree from './steps/StepThree';
import StepTwo from './steps/StepTwo';
import StepFour from './steps/StepFour';
import { theme } from '@theme/theme';
import Container from '@components/Container';
import { ModalConfirmation } from '@components/Modal';
import { useNavigation } from '@react-navigation/native';
import Spacer from '@components/Spacer';

const SignUpScreen: React.FC = (props: any) => {
  const [step, setStep] = useState(1);
  const [dataRegister, setDataRegister] = useState<any>(
    props?.route?.params?.data
      ? { ...props?.route?.params?.data, isEdit: true }
      : false
  );
  const navigation = useNavigation<any>();
  const showStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            setDataRegister={setDataRegister}
            setStep={setStep}
            step={step}
            dataRegister={dataRegister}
          />
        );
      case 2:
        return (
          <StepTwo
            setDataRegister={setDataRegister}
            setStep={setStep}
            step={step}
            dataRegister={dataRegister}
          />
        );
      case 3:
        return (
          <StepThree
            setDataRegister={setDataRegister}
            setStep={setStep}
            step={step}
            dataRegister={dataRegister}
          />
        );
      case 4:
        return (
          <StepFour
            setDataRegister={setDataRegister}
            setStep={setStep}
            step={step}
            dataRegister={dataRegister}
            setModalVisible={setModalVisible}
            isEdit={dataRegister?.isEdit}
          />
        );
      default:
        return (
          <StepOne
            setDataRegister={setDataRegister}
            setStep={setStep}
            step={step}
            dataRegister={dataRegister}
          />
        );
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleConfirm = () => {
    setModalVisible(false);

    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 1000);
  };

  return (
    <Container
      title="Cadastro"
      scrollEnabled
      hasGoBack
      handlerPrimary={step === 1 ? navigation.goBack : () => setStep(step - 1)}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.mainDiv}>{showStep()}</View>
        <Spacer size="medium" />
      </View>
      <ModalConfirmation
        visible={modalVisible}
        title="Cadastro em análise"
        subtitle="Seu cadastro foi realizado com sucesso, enquanto nosso time está analisando, você pode navegar em algumas funcionalidades normalmente."
        onClose={handleConfirm}
        onConfirm={handleConfirm}
        okText="Ok"
      />
    </Container>
  );
};
export default SignUpScreen;
const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainDiv: {
    borderColor: 'black',
    justifyContent: 'flex-start',
    width: '100%',
  },
  viewNull: {
    width: '70%',
    height: 8,
    backgroundColor: '#EFF1F3',
    borderRadius: 10,
    marginTop: 10,
  },
  viewCompleted: {
    width: '60%',
    backgroundColor: '#118936',
    height: 8,
    borderRadius: 50,
  },
  view: {
    flexDirection: 'row',
  },
  Title: {
    color: theme.colors.primary.contrastText,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
