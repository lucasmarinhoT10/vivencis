import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StepOne from './steps/StepOne';
import StepThree from './steps/StepThree';
import StepTwo from './steps/StepTwo';
import StepFour from './steps/StepFour';
import { theme } from '@theme/theme';
import Container from '@components/Container';
import { useNavigation } from '@react-navigation/native';
import Spacer from '@components/Spacer';
import Button from '@components/Button';

const ManualOSClose: React.FC = (props) => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation<any>();
  const showStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      default:
        return <StepOne />;
    }
  };

  return (
    <Container title="Cadastro" scrollEnabled noHeader>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.parentView}>
          <View style={styles.mainDiv}>{showStep()}</View>
          <Spacer size="medium" />
        </ScrollView>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 30,
            gap: 5,
          }}
        >
          {[1, 2, 3, 4].map((it) => {
            return (
              <View
                key={it}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: step === it ? 'black' : '#9a9a9a',
                }}
              />
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Button
            text={'Voltar'}
            style={{ height: theme.sizes.extralarge }}
            variant="secondary"
            onPress={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                navigation.goBack();
              }
            }}
            halfWidth
          />
          <Button
            text={step === 4 ? 'Concluir' : 'Próximo'}
            style={{ height: theme.sizes.extralarge }}
            variant="quaternary"
            onPress={() => {
              if (step < 4) {
                setStep(step + 1);
              } else {
                navigation.goBack();
              }
            }}
            halfWidth
          />
        </View>
      </View>
    </Container>
  );
};
export default ManualOSClose;
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
