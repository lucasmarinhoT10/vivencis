import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { theme } from '@theme/theme';
import { projectDetailsMock } from 'src/mocks/projectMock';
import { useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { fetchProjectDetail } from '../services/project.services';
import { OSCardInfo } from '@components/OSCardInfo';
import Button from '@components/Button';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import { getStatus } from '../../SignIn/services/login.services';
import useUserStore from 'src/store/userStore';
import useRegisterStore from 'src/store/useRegisterStore';

type DetailsProjectsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function OSDetails(props: any) {
  const [data, setData] = useState(props.route.params);
  const { user } = useUserStore();
  const { register } = useRegisterStore();
  const cpfRegistrado = register?.responsavel_cpf;
  const navigation = useNavigation<DetailsProjectsScreenNavigationProp>();
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState(false);
  const [status, setStatus] = useState('');
  const [CPFValidation, setCPFValidation] = useState('');
  const getStatusData = async () => {
    const status = await getStatus({
      id_parceiro: user?.id_entidade,
    });
    setStatus(status?.status_analise);
  };
  useEffect(() => {
    getStatusData();
  }, []);
  return (
    <Container
      scrollEnabled
      title={`OS ${data?.id_os}`}
      hasGoBack
      spacerVertical="small"
    >
      <View
        style={{
          padding: 12,
          backgroundColor: theme.colors.primary.main,
          marginBottom: 12,
          borderRadius: 4,
        }}
      >
        <Text>
          <Text style={styles.value}>Atenção:</Text>
          <Text style={styles.label}>
            {' '}
            A ordem de serviço já está atrelada ao parceiro e deverá ser
            realizada até o dia {data?.dta_agendamento}.
          </Text>
        </Text>
      </View>
      <OSCardInfo title={'Informações básicas'} data={data} />
      <OSCardInfo title={'Dados do cliente'} data={data} isClient />
      <Button
        variant="secondary"
        text="Manual de preenchimento"
        style={{ height: 48 }}
        onPress={() => navigation.navigate('ManualOSClose' as never, data)}
      />
      <Spacer size="medium" />
      <Button
        variant="quaternary"
        text="Executar ordem de serviço"
        style={{ height: 48 }}
        onPress={() => {
          if (status === 'LIBERADO') {
            setIsOpenModalConfirmation(true);
          } else {
            Alert.alert(
              'OS indisponível no momento.',
              'Aguarde o status do seu registro ser liberado.'
            );
          }
        }}
      />
      <Spacer size="medium" />
      <Modal
        visible={isOpenModalConfirmation}
        onRequestClose={() => setIsOpenModalConfirmation(false)}
        transparent
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}
          >
            <Spacer size="large" />
            <View>
              <Text style={styles.modalTitle}>Confirmação</Text>
              <Spacer size="small" />
              <Text style={styles.modalText}>
                Por favor, digite os 4 dígitos iniciais CPF/NIS.
              </Text>
              <Spacer size="medium" />
              <Input
                name=""
                maxLength={4}
                onChangeText={(it) => setCPFValidation(it)}
              />
            </View>
            <Spacer size="large" />
            <View style={styles.modalButtonsRow}>
              <Button
                halfWidth
                variant="secondary"
                text="Cancelar"
                onPress={() => setIsOpenModalConfirmation(false)}
              />
              <Button
                halfWidth
                text="Confirmar"
                variant="quaternary"
                onPress={() => {
                  if (
                    cpfRegistrado &&
                    CPFValidation === cpfRegistrado.substring(0, 4)
                  ) {
                    navigation.navigate('OSClose' as never, data);
                    setIsOpenModalConfirmation(false);
                  } else {
                    Alert.alert(
                      'Erro',
                      'Os 4 dígitos informados não correspondem ao registro.'
                    );
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: theme.spacing.extraSmall,
    paddingVertical: theme.spacing.doubleMedium,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.primary.contrastText,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.contrastText,
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    height: 306,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary.carousel,
  },
  viewText: {
    width: '100%',
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 16,
  },
  orderButton: {
    flexDirection: 'row',
  },
  modalBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
  },
  termosContainer: {
    width: '95%',
    height: '70%',
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
});
