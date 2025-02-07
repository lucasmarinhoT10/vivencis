import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import Button from '@components/Button';
import MaskInput from 'react-native-mask-input';

export interface FilterCriteria {
  tipo: string; // Serviço
  projeto: string; // Projeto (ID ou nome)
  status: string; // Status
  tecnico: string; // Razão social do técnico
  data: string; // Data de agendamento (DD/MM/AAAA)
}

interface ProjectFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (criteria: FilterCriteria) => void;
}

const FILTER_STATUS_OPTIONS = [
  'AGUARDANDO ATENDIMENTO',
  'CANCELADA',
  'CORREÇÃO',
  'EXECUTADA',
  'IMPRODUTIVA',
  'INSTALADA',
];

const FILTER_TIPO_OPTIONS = ['INSTALAÇÃO', 'ATG', 'CONTESTAÇÃO', 'ATG-I'];

const ProjectFilterModal: React.FC<ProjectFilterModalProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const [selectedTipo, setSelectedTipo] = useState<string>('');
  const [projeto, setProjeto] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [tecnico, setTecnico] = useState<string>('');
  const [data, setData] = useState<string>('');

  const handleSelectTipo = (item: string) => {
    setSelectedTipo((prev) => (prev === item ? '' : item));
  };

  const handleSelectStatus = (item: string) => {
    setSelectedStatus((prev) => (prev === item ? '' : item));
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filtros</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Filtro: Serviço */}
            <Text style={styles.sectionTitle}>Serviço</Text>
            <View style={styles.optionsContainer}>
              {FILTER_TIPO_OPTIONS.map((item) => {
                const isSelected = selectedTipo === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => handleSelectTipo(item)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filtro: Status */}
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.optionsContainer}>
              {FILTER_STATUS_OPTIONS.map((item) => {
                const isSelected = selectedStatus === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => handleSelectStatus(item)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* Filtro: Técnico */}
            <Text style={styles.sectionTitle}>Técnico</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Razão social do técnico"
              value={tecnico}
              onChangeText={setTecnico}
            />
            {/* Filtro: Data Agendamento */}
            <Text style={styles.sectionTitle}>Data Agendamento</Text>
            <MaskInput
              style={styles.textInput}
              placeholder="DD/MM/AAAA"
              value={data}
              onChangeText={setData}
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
          </ScrollView>
          <Button
            text="Aplicar Filtros"
            variant="quinary"
            onPress={() => {
              onApply({
                tipo: selectedTipo,
                projeto,
                status: selectedStatus,
                tecnico,
                data,
              });
              onClose();
            }}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    maxHeight: '90%',
    borderRadius: 10,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: theme.colors.primary.gray,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
  },
  optionButtonSelected: {
    backgroundColor: theme.colors.primary.quaternary,
  },
  optionText: {
    fontSize: 12,
    color: theme.colors.primary.title,
  },
  optionTextSelected: {
    color: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default ProjectFilterModal;
