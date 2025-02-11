import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Foundation from '@expo/vector-icons/Foundation';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { theme } from '@theme/theme';

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
  data: any;
  isClient?: boolean;
  onPress?: () => void;
  highlightFirstItem?: boolean;
  menuOptions?: MenuOption[];
}

export const OSCardInfoSecondary: React.FC<ListCardProps> = ({
  header,
  data,
  title,
  isClient,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(true);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleMenu}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.card,
          {
            borderRadius: 8,
          },
        ]}
      >
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          {header ? null : <Text style={styles.cardTitle}>{title}</Text>}
          <Entypo
            name={isMenuVisible ? 'chevron-small-up' : 'chevron-small-down'}
            size={28}
          />
        </View>

        {isMenuVisible && (
          <>
            <View style={styles.item}>
              <Text style={styles.label}>Tipo</Text>
              <Text style={styles.value}>{data?.type ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>{data?.state ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Estágio</Text>
              <Text style={styles.value}>{data?.internship ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Cliente</Text>
              <Text style={styles.value}>{data?.client ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Bairro</Text>
              <Text style={styles.value}>{data?.neighborhood ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Cidade-UF</Text>
              <Text style={styles.value}>{data?.city ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Data Vencimento</Text>
              <Text style={styles.value}>{data.dueDate ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Data Agendada</Text>
              <Text style={styles.value}>{data?.scheduledDate ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Técnico</Text>
              <Text style={styles.value}>{data?.technical ?? '-'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Valor</Text>
              <Text style={styles.value}>{data?.value ?? '-'}</Text>
            </View>
          </>
        )}
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
  card: {
    backgroundColor: theme.colors.primary.contrastText,
    padding: 16,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary.title,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
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
