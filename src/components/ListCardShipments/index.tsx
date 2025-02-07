import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Foundation from '@expo/vector-icons/Foundation';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import Icon from '@components/Icon';
import { RemessaProps } from 'src/store/Models/Shipments';

interface Item {
  label: string;
  value: string;
}

interface MenuOption {
  text: string;
  onPress: () => void;
}

interface HeaderProps {
  osNumber: string;
  hasAlert?: boolean;
  onOptionsPress?: () => void;
}

interface ListCardProps {
  header?: HeaderProps;
  title?: string;
  data: RemessaProps;
  onPress?: () => void;
  highlightFirstItem?: boolean;
  showInfoCard?: boolean;
  isTechnicianSelected?: boolean;
  menuOptions?: MenuOption[];
}

export const ListCardShipments: React.FC<ListCardProps> = ({
  header,
  data,
  title,
  onPress,
  showInfoCard = true,
  isTechnicianSelected,
  highlightFirstItem = false,
  menuOptions = [
    { text: 'Detalhes', onPress: () => console.log('Detalhes clicado') },
    {
      text: 'Corrigir ordem de serviço',
      onPress: () => console.log('Corrigir ordem de serviço clicado'),
    },
  ],
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [showInfoToggle, setShowInfoToggle] = useState(showInfoCard);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleShowInfo = () => {
    setShowInfoToggle((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        {header && (
          <View style={styles.header}>
            <Text style={styles.headerText}>{header.osNumber}</Text>
            <View style={styles.headerIcons}>
              {(header.hasAlert ?? true) && (
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
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuOption}
                onPress={() => {
                  option.onPress();
                  setMenuVisible(false);
                }}
              >
                <Text style={styles.menuText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
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
            <Text style={styles.labelID}>Identificador</Text>
            <Text style={styles.valueID}>{data?.identificador}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>{data?.data}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{data?.status}</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Projeto</Text>
            <Text style={styles.value}>{data?.projeto}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Cidade - UF PTA</Text>
            <Text style={styles.value}>
              {data?.cidade}/{data?.uf}
            </Text>
          </View>
        </View>
      </View>
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
  labelID: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.title,
    flex: 1,
  },
  valueID: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.title,
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
    top: 40,
    right: 10,
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
