import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { theme } from '@theme/theme';
import Icon from '@components/Icon';

interface Item {
  label: string;
  value: string;
}

interface MenuOption {
  text: string; // Texto a ser exibido no menu
  onPress: () => void; // Função a ser chamada ao clicar
}

interface HeaderProps {
  name: string;
  onOptionsPress?: () => void;
}

interface ListCardProps {
  header?: HeaderProps;
  title?: string;
  data: any;
  onPress?: () => void;
  highlightFirstItem?: boolean;
  highlightLastItem?: boolean;
  showInfoCard?: boolean;
  isTechnicianSelected?: boolean;
  menuOptions?: MenuOption[]; // Lista de opções do menu
}

export const CardDetailsProjects: React.FC<ListCardProps> = ({
  header,
  data,
  title,
  onPress,
  showInfoCard = true,
  isTechnicianSelected,
  highlightFirstItem = false,
  highlightLastItem = false,
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
    <View style={styles.container}>
      {header && (
        <View style={styles.header}>
          <Text style={styles.headerText}>{header.name}</Text>
        </View>
      )}
      <View
        style={[
          styles.card,
          {
            borderRadius: 8,
          },
        ]}
      >
        <View style={[styles.item]}>
          <Text style={[styles.label]}>Data de execução</Text>
          <Text style={[styles.value]}>{data?.data_execucao}</Text>
        </View>
        <View style={[styles.item]}>
          <Text style={[styles.label]}>Data final execução</Text>
          <Text style={[styles.value]}>{data?.data_limite_execucao}</Text>
        </View>
        <View style={[styles.item]}>
          <Text style={[styles.label]}>Descricao projeto </Text>
          <Text style={[styles.value]}>{data?.descricao_projeto}</Text>
        </View>
        <View style={[styles.item]}>
          <Text style={[styles.label]}>Valor total do projeto</Text>
          <Text style={[styles.value]}>
            {Number(data?.valor_total)?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Text>
        </View>
      </View>
    </View>
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
    padding: 16,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary.quaternary,
    padding: 12,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    width: '100%',
  },

  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary.contrastText,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
  },
  itemLong: {
    flexDirection: 'column',
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
  lastItemValue: {
    color: '#484C52', // Define a cor vermelha para o último item
    fontWeight: '700', // Opcional: deixa o texto mais destacado
    fontSize: 14,
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
