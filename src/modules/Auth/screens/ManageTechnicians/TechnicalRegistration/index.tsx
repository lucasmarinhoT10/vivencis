import Button from '@components/Button';
import Container from '@components/Container';
import Input from '@components/Input';
import Line from '@components/Line';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import DownloadFile from '@components/DownloadFile';

import { theme } from '@theme/theme';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootDrawerParamList } from '@routes/routes';
import ImageUploader from '@components/ImageUploader';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RegisterDocumentScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

const TechnicalRegistrationScreen: React.FC = () => {
  const navigation = useNavigation<RegisterDocumentScreenNavigationProp>();
  const formMethods = useForm();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const [qualifications, setQualifications] = useState<
    Array<{ id: number; fileName: string }>
  >([]);
  const [nextId, setNextId] = useState(1);

  const handleAddQualification = () => {
    setQualifications((prev) => [
      ...prev,
      { id: nextId, fileName: `qualificacao-${nextId}.pdf` },
    ]);
    setNextId((prev) => prev + 1);
  };
  return (
    <Container scrollEnabled title="Cadastro de Técnico" hasGoBack>
      <View style={styles.content}>
        {currentStep === 1 && (
          <>
            <Typograph
              variant="title"
              textAlign="left"
              fontWeight="500"
              style={styles.title}
            >
              1. Dados cadastrais
            </Typograph>
            <Spacer size="medium" />
            <Line progress={0.3} height={8} />
            <Spacer size="medium" />
            <FormProvider {...formMethods}>
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="400"
                style={styles.title}
              >
                Nome completo
              </Typograph>
              <Input control={formMethods.control} name="name" />
              <Spacer size="medium" />
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="400"
                style={styles.title}
              >
                CPF
              </Typograph>
              <Input control={formMethods.control} name="cpf" />
              <Spacer size="medium" />
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="400"
                style={styles.title}
              >
                Email
              </Typograph>
              <Input control={formMethods.control} name="email" />
              <Spacer size="medium" />
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="400"
                style={styles.title}
              >
                Confirmar email
              </Typograph>
              <Input control={formMethods.control} name="confirmEmail" />
              <Spacer size="medium" />
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="400"
                style={styles.title}
              >
                Senha
              </Typograph>
              <Input control={formMethods.control} name="password" />
              <Spacer size="medium" />
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="400"
                style={styles.title}
              >
                Confirmar senha
              </Typograph>
              <Input control={formMethods.control} name="confirmPassword" />
              <Spacer size="extraLarge" />
            </FormProvider>
            <Button
              text="Próximo"
              style={{ height: theme.sizes.extralarge }}
              variant="quaternary"
              onPress={handleNextStep}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <View>
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="500"
                style={styles.title}
              >
                2. Serviços e qualificações
              </Typograph>
              <Spacer size="medium" />
              <Line progress={0.7} height={8} />
              <Spacer size="medium" />
              <Typograph
                variant="title"
                textAlign="left"
                fontWeight="500"
                style={styles.title}
              >
                Qualificações
              </Typograph>
              <Spacer size="small" />

              {qualifications.map((qualification) => (
                <View key={qualification.id} style={styles.fileCard}>
                  <ImageUploader
                    title={`Qualificação ${qualification.id}`}
                    fileName={qualification.fileName}
                    onDeletePress={() => console.log('Qualificação excluída')}
                  />
                </View>
              ))}
              <Spacer size="small" />
              <Input
                control={formMethods.control}
                placeholder="Descreva a qualificação"
                name="namePersonResponsible"
              />
              <Spacer size="medium" />
              <DownloadFile
                iconType="file"
                label="Anexar arquivo"
                onImageSelect={(uri) => console.log('Imagem selecionada:', uri)}
              />
              <Spacer size="large" />
              <TouchableOpacity onPress={handleAddQualification}>
                <Typograph
                  variant="title"
                  textAlign="center"
                  fontWeight="500"
                  style={{
                    color: theme.colors.primary.link,
                    fontSize: theme.sizes.small,
                    marginBottom: 100,
                  }}
                >
                  Adicionar qualificação
                </Typograph>
              </TouchableOpacity>
              <Spacer size="extraLarge" />
              <Spacer size="extraLarge" />
              <Spacer size="extraLarge" />
              <Button
                text="Finalizar cadastro"
                variant="quaternary"
                style={styles.button}
                onPress={() =>
                  navigation.navigate('ManageTechnicians', {
                    addTechnical: true,
                  } as never)
                }
              />
            </View>
          </>
        )}
      </View>
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
