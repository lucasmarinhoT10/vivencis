import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import Input from '@components/Input';
import Spacer from '@components/Spacer';
import Button from '@components/Button';
import { theme } from '@theme/theme';

interface Technician {
  id: string;
  name: string;
  cpf: string;
  phone: string;
}

interface TechnicianAssignmentCardProps {
  onTechnicianSelected: (isSelected: boolean) => void; 
}

const techniciansMock: Technician[] = [
  {
    id: '1',
    name: 'Francisco Fábio Emanuel Sales',
    cpf: '864.189.641-44',
    phone: '34 99324-2237',
  },
  {
    id: '2',
    name: 'João Silva',
    cpf: '123.456.789-10',
    phone: '34 91234-5678',
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    cpf: '987.654.321-00',
    phone: '34 97654-3210',
  },
];

const TechnicianAssignmentCard: React.FC<TechnicianAssignmentCardProps> = ({onTechnicianSelected}) => {
  const [assignedTechnician, setAssignedTechnician] =
    useState<Technician | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleAssignTechnician = () => {
    if (selectedTechnician) {
      setAssignedTechnician(selectedTechnician);
      closeModal();
      onTechnicianSelected(true);
    }
  };

  const filteredTechnicians = techniciansMock.filter((tech) =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.description}>
          <Text style={styles.title}>Técnico designado</Text>
          {assignedTechnician && (
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons
                name="ellipsis-horizontal"
                size={20}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          )}
          {/* Menu */}
          {isMenuVisible && (
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  setMenuVisible(false);
                  openModal();
                }}
              >
                <Text style={styles.menuText}>Alterar técnico (?)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  console.log('Ação 2');
                  setMenuVisible(false);
                }}
              >
                <Text style={styles.menuText}>Ação 2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  console.log('Ação 3');
                  setMenuVisible(false);
                }}
              >
                <Text style={styles.menuText}>Ação 3</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.row}>
          <View style={styles.user}>
            <Feather name="user" size={20} color={theme.colors.primary.link} />
          </View>
          <View style={styles.details}>
            {assignedTechnician ? (
              <>
                <Text style={styles.name}>{assignedTechnician.name}</Text>

                <View style={styles.description}>
                  <View style={styles.infoGroup}>
                    <Text style={styles.infoLabel}>CPF:</Text>
                    <Text style={styles.infoValue}>
                      {assignedTechnician.cpf}
                    </Text>
                  </View>
                  <View style={styles.infoGroup}>
                    <Text style={styles.infoLabel}>Celular:</Text>
                    <Text style={styles.infoValue}>
                      {assignedTechnician.phone}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <Text style={styles.placeholder}>
                Nenhum técnico atribuído à OS
              </Text>
            )}
          </View>
        </View>
        {!assignedTechnician && (
          <TouchableOpacity onPress={openModal}>
            <View style={styles.line}></View>
            <Text style={styles.assignButton}>Atribuir técnico</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Atribuir técnico</Text>
              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Spacer size="medium" />
            <Input
              showSearchIcon
              name="buscar técnicos"
              placeholder="Buscar em técnicos"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Spacer size="medium" />
            <FlatList
              data={filteredTechnicians}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.technicianCard,
                    selectedTechnician?.id === item.id && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedTechnician(item)}
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
                      <Text style={styles.name}>{item.name}</Text>
                      <View style={styles.description}>
                        <View style={styles.infoGroup}>
                          <Text style={styles.infoLabel}>CPF:</Text>
                          <Text style={styles.infoValue}>{item.cpf}</Text>
                        </View>
                        <View style={styles.infoGroup}>
                          <Text style={styles.infoLabel}>Celular:</Text>
                          <Text style={styles.infoValue}>{item.phone}</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.selectionCircle,
                        selectedTechnician?.id === item.id
                          ? styles.selectedCircle
                          : styles.unselectedCircle,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
            <View>
              <Spacer size="small" />
              <Button
                text="Atribuir"
                style={{
                  height: theme.sizes.extralarge,
                  backgroundColor: theme.colors.primary.button,
                }}
                onPress={handleAssignTechnician}
                variant="quaternary"
              />
              <Spacer size="medium" />
              <Button
                text="Cancelar"
                fontWeight="600"
                color={theme.colors.primary.link}
                style={{ height: theme.sizes.extralarge }}
                onPress={closeModal}
                variant="tertiary"
              />
              <Spacer size="medium" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
  line: {
    width: 'auto',
    height: 1,
    backgroundColor: '#F4F4F5',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 20,
  },
  menu: {
    alignSelf: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 10,
    right: 1,
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
  header: {
    display: 'flex',
    marginLeft: 115,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary.title,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
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

  placeholder: {
    fontSize: 14,
    color: theme.colors.text.description,
  },
  assignButton: {
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    alignSelf:'center',
    textAlign: 'right',
    color: theme.colors.primary.link,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 600,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#032940',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
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
  selectionCircle: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  selectedCircle: {
    borderColor: theme.colors.primary.link,
    borderWidth: 4,
  },
  unselectedCircle: {
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  cancelText: {
    color: '#4CA3DD',
  },
});

export default TechnicianAssignmentCard;
