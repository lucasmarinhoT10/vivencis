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

export interface Technician {
  id: number;
  nome: string;
  os_atribuidas: number;
  status: string;
  cpf: string;
  celular: string;
}

interface TechnicianCardProps {
  technicians: Technician[]; // Lista de técnicos fornecida como prop
  onTechnicianSelect?: (technician: Technician) => void; // Callback ao selecionar técnico
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({
  technicians,
  onTechnicianSelect,
}) => {
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const filteredTechnicians = technicians.filter((tech) =>
    tech.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTechnicianPress = (technician: Technician) => {
    setSelectedTechnician(technician);
    onTechnicianSelect?.(technician);
  };

  return (
    <View style={styles.container}>
      <Spacer size="medium" />
      <FlatList
        data={filteredTechnicians}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.technicianCard}
            onPress={() => handleTechnicianPress(item)}
          >
            <View style={styles.row}>
              <View style={styles.user}>
                <Feather
                  name="user"
                  size={20}
                  color={theme.colors.primary.link}
                />
              </View>
              <View style={styles.details}>
                <View style={styles.header}>
                  <Text style={styles.name}>{item.nome}</Text>
                  <TouchableOpacity onPress={() => toggleMenu(item.id)}>
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
                    <Text style={styles.infoValue}>{item?.cpf}</Text>
                  </View>
                  <View style={styles.infoGroup}>
                    <Text style={styles.infoLabel}>Celular:</Text>
                    <Text style={styles.infoValue}>{item.celular}</Text>
                  </View>
                  <View style={styles.infoGroup}>
                    <Text style={styles.infoLabel}>OS atribuidas:</Text>
                    <Text style={styles.infoValue}>{item.os_atribuidas}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Spacer size="small" />
            {activeMenuId === item.id && (
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    setActiveMenuId(null);
                  }}
                >
                  <Text style={styles.menuText}>Itens</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    console.log('Ação 2');
                    setActiveMenuId(null);
                  }}
                >
                  <Text style={styles.menuText}>Aceite</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
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
    backgroundColor: theme.colors.primary.contrastText,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {},
});

export default TechnicianCard;
