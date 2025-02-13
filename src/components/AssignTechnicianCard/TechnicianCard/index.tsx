import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import Spacer from '@components/Spacer';
import { useNavigation } from '@react-navigation/native';

export interface Technician {
  id: number;
  nome: string;
  os_atribuidas: number;
  status: string;
  cpf: string;
  celular: string;
}

interface TechnicianCardProps {
  data: Technician;
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({ data }) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.technicianCard}
      onPress={() => toggleMenu()}
    >
      <View style={styles.row}>
        <View style={styles.user}>
          <Feather name="user" size={20} color={theme.colors.primary.link} />
        </View>
        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.name}>{data.nome}</Text>
            <TouchableOpacity onPress={() => toggleMenu()}>
              <Ionicons
                name="ellipsis-horizontal"
                size={20}
                style={{ alignItems: 'flex-end' }}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.description}>
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>CPF:</Text>
              <Text style={styles.infoValue}>{data?.cpf}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Celular:</Text>
              <Text style={styles.infoValue}>{data.celular}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>OS atribuidas:</Text>
              <Text style={styles.infoValue}>{data.os_atribuidas}</Text>
            </View>
          </View>
        </View>
      </View>
      <Spacer size="small" />
      {visible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              navigation?.navigate('TechnicalRegistration' as never, {
                ...data,
                isEdit: true,
              });
              setVisible(false);
            }}
          >
            <Text style={styles.menuText}>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 2,
  },
  user: {
    backgroundColor: theme.colors.primary.user,
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu: {
    alignSelf: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 10,
    right: 35,
    backgroundColor: theme.colors.surface,
    width: '35%',
    borderRadius: 6,
    padding: theme.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 9999000000,
  },
  menuOption: {
    paddingVertical: theme.spacing.small,
  },
  menuText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
    padding: 1,
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    flex: 1,
    marginLeft: 8,

    alignItems: 'flex-start',
  },
  description: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  infoGroup: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: '400',
    color: theme.colors.text.description,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.text.description,
    marginTop: 2,
    marginRight: 40,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.primary.title,
    marginBottom: 8,
  },

  technicianCard: {
    padding: 12,
    borderWidth: 0.5,
    backgroundColor: theme.colors.primary.contrastText,
    borderColor: theme.colors?.border,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {},
});

export default TechnicianCard;
