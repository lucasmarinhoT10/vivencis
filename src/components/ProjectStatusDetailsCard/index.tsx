import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { theme } from '@theme/theme';

import Typograph from '@components/Typograph';

interface ProjectStatusDetailsCardProps {
  data: any;
  onPress?: () => void;
  highlightFirstItem?: boolean;
  showInfoCard?: boolean;
}

export const ProjectStatusDetailsCard: React.FC<
  ProjectStatusDetailsCardProps
> = ({ data, onPress, showInfoCard = true }) => {
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'NF não enviada':
        return '#E06D2D';
      case 'NF enviada':
        return '#6DC6E0';
      case 'Pago':
        return '#08875D';
      case 'Negado':
        return '#E02D3C';
      default:
        return '#ccc';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={[styles.card]}>
          <View style={styles.item}>
            <Text style={styles.label}>Qrd ordem de serviço</Text>
            <Text style={styles.value}>{data?.qrServiceOrder}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Valor total</Text>
            <Text style={styles.value}>{data?.totalValue}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Valor médio por projeto</Text>
            <Text style={styles.value}>{data?.averageValue}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Projeto envolvido</Text>
            <Text style={styles.value}>{data?.projectInvolved}</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Status</Text>
            <Text
              style={[
                styles.statusContainer,
                { backgroundColor: getStatusColor(data?.status) },
              ]}
            >
              {data?.status}
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
    borderRadius: 8,
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
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

  statusContainer: {
    width: 104,
    height: 18,
    color: 'white',
    fontWeight: 400,
    fontSize: 12,
    textAlign: 'right',
    paddingRight: 4,
    padding: 2,
    borderRadius: 4,
  },
});
