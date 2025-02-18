import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from 'react-native';

import Foundation from '@expo/vector-icons/Foundation';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import Icon from '@components/Icon';
import { useNavigation } from '@react-navigation/native';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import Button from '@components/Button';

interface Item {
  label: string;
  value: string;
}

interface MenuOption {
  text: string; // Texto a ser exibido no menu
  onPress: () => void; // Função a ser chamada ao clicar
}

interface HeaderProps {
  osNumber: string;
  hasAlert?: boolean;
  onOptionsPress?: () => void;
}

interface ListCardProps {
  header?: HeaderProps;
  title?: string;
  data: any;
  onPress?: () => void;
  highlightFirstItem?: boolean;
  showInfoCard?: boolean;
  isTechnicianSelected?: boolean;
  menuOptions?: MenuOption[]; // Lista de opções do menu
}

export const ListCardProjects: React.FC<ListCardProps> = ({
  header,
  data,
  title,
  onPress,
  showInfoCard = true,
  isTechnicianSelected,
  highlightFirstItem = false,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [showInfoToggle, setShowInfoToggle] = useState(showInfoCard);
  const cpfRegistrado = data?.cpf;
  const [CPFValidation, setCPFValidation] = useState('');
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleShowInfo = () => {
    setShowInfoToggle((prev) => !prev);
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        {header && (
          <View style={styles.header}>
            <Text style={styles.headerText}>OS {header.osNumber}</Text>
            <View style={styles.headerIcons}>
              {(header.hasAlert ?? false) && (
                <Foundation name="alert" size={22} color="#E02D3C" />
              )}
              {header.onOptionsPress && (
                <TouchableOpacity onPress={toggleMenu}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={18}
                    style={styles.menu}
                    color={theme.colors.text.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                if (onPress) onPress();
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>Detalhes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setIsOpenModalConfirmation(true);
                // setMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>Executar OS</Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.card,
            {
              borderTopEndRadius: header ? 0 : 8,
              borderTopStartRadius: header ? 0 : 8,
              borderBottomEndRadius: 8,
              borderBottomStartRadius: 8,
            },
          ]}
        >
          {header ? null : <Text style={styles.cardTitle}>{title}</Text>}
          {isTechnicianSelected && (
            <TouchableOpacity
              style={styles.buttonToggleCard}
              onPress={handleShowInfo}
            >
              {showInfoToggle == false ? (
                <Icon
                  name="down"
                  size="small"
                  iconLibrary="AntDesign"
                  color="#000"
                />
              ) : (
                <Icon
                  name="up"
                  size="small"
                  iconLibrary="AntDesign"
                  color="#000"
                />
              )}
            </TouchableOpacity>
          )}

          <View style={styles.item}>
            <Text style={styles.label}>Tipo</Text>
            <Text style={styles.value}>{data?.tipo}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{data?.status}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Estágio</Text>
            <Text style={styles.value}>{data?.estagio}</Text>
          </View>
          {/* <View style={styles.item}>
            <Text style={styles.label}>Cliente</Text>
            <Text style={styles.value}>{data.status}</Text>
          </View> */}
          <View style={styles.item}>
            <Text style={styles.label}>Bairro</Text>
            <Text style={styles.value}>{data?.bairro}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Cidade - UF</Text>
            <Text style={styles.value}>
              {data?.cidade} - {data?.uf}
            </Text>
          </View>
          {/* <View style={styles.item}>
            <Text style={styles.label}>Data Vencimento</Text>
            <Text style={styles.value}>{data?.status}</Text>
          </View> */}
          <View style={styles.item}>
            <Text style={styles.label}>Data Agendada</Text>
            <Text style={styles.value}>{data?.dta_agendamento}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Técnico</Text>
            <Text style={styles.value}>{data?.nome_tecnico}</Text>
          </View>
        </View>
      </View>
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
                keyboardType="numeric"
                value={CPFValidation}
                onChangeText={(text) => {
                  const onlyDigits = text.replace(/\D/g, '');
                  const onlyFour = onlyDigits.slice(0, 4);
                  setCPFValidation(onlyFour);
                }}
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
                    // if (data?.status === 'CORRIGIR INSTALAÇÃO') {
                    //   navigation.navigate('OSCorrection' as never, data);
                    // } else {
                    //   navigation.navigate('OSClose' as never, data);
                    // }
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonToggleCard: {
    position: 'absolute',
    top: 18,
    right: 16,
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
  card: {
    backgroundColor: theme.colors.primary.contrastText,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.bgOrderButton,
    padding: 12,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    width: '100%',
  },

  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary.title,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary.title,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemLong: {
    flexDirection: 'column', // Alinha o valor abaixo do rótulo
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.primary.placeholder,
    flex: 1,
  },
  value: {
    fontSize: 12,
    color: theme.colors.primary.labelValue,
    flex: 1,
    textAlign: 'right',
  },
  valueLong: {
    textAlign: 'left',
    marginTop: 4,
  },
  firstItemContainer: {
    marginBottom: 10,
  },
  firstItemText: {
    color: theme.colors.primary.title,
    fontWeight: '600',
    fontSize: 12,
  },
  menu: {
    alignSelf: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 5,
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    padding: theme.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 9999,
  },
  menuOption: {
    paddingVertical: theme.spacing.small,
  },
  menuText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
    padding: 1,
  },
});
