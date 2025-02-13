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

export const OSCardInfo: React.FC<ListCardProps> = ({
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
            {isClient ? (
              <>
                <View style={styles.item}>
                  <Text style={styles.label}>Cliente</Text>
                  <Text style={styles.value}>{data?.cliente ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Data nascimento</Text>
                  <Text style={styles.value}>
                    {data?.dta_nascimento ?? '-'}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>CEP</Text>
                  <Text style={styles.value}>{data?.cep ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Endereço</Text>
                  <Text style={styles.value}>{data?.endereco ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Numero</Text>
                  <Text style={styles.value}>{data?.numero ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Bairro</Text>
                  <Text style={styles.value}>{data?.bairro ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Cidade</Text>
                  <Text style={styles.value}>{data.cidade ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Telefone</Text>
                  <Text style={styles.value}>{data?.telefone ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Celular</Text>
                  <Text style={styles.value}>{data?.celular ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{data?.email ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Ponto de referência</Text>
                </View>
                <Text
                  style={[
                    styles.label,
                    { color: theme.colors.primary.labelValue },
                  ]}
                >
                  {data?.referencia ?? '-'}
                </Text>
              </>
            ) : (
              <>
                <View style={styles.item}>
                  <Text style={styles.label}>Num. OS</Text>
                  <Text style={styles.value}>{data?.numero_os ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Estágio</Text>
                  <Text style={styles.value}>{data?.estagio ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Status</Text>
                  <Text style={styles.value}>{data?.status ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Data Agendamento</Text>
                  <Text style={styles.value}>
                    {data?.dta_agendamento ?? '-'}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Periodo</Text>
                  <Text style={styles.value}>{data?.periodo ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Tipo</Text>
                  <Text style={styles.value}>{data?.tipo ?? '-'}</Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.label}>Origem</Text>
                  <Text style={styles.value}>{data?.origem ?? '-'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Valor total a ser pago</Text>
                  <Text style={styles.value}>{data?.valor ?? '-'}</Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.label}>Técnico</Text>
                  <Text style={styles.value}>{data?.nome_tecnico}</Text>
                </View>
              </>
            )}
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
