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
import Input from '@components/Input';
import { Masks } from 'react-native-mask-input';
import { removingSpecialChars } from '../../config/utils';
import Spacer from '@components/Spacer';

export interface FilterCriteria {
  nome?: string;
  cpf?: string;
  status?: string;
}

interface ProjectFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (criteria: FilterCriteria) => void;
}

const ProjectFilterModal: React.FC<ProjectFilterModalProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const [CPF, setCPF] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const handleSelectStatus = (item: string) => {
    setSelectedStatus((prev) => (prev === item ? '' : item));
  };
  const handleApply = () => {
    onApply({ nome, cpf: removingSpecialChars(CPF), status: selectedStatus });
    onClose();
  };
  const handleClearFilters = () => {
    setCPF('');
    setNome('');
    setSelectedStatus('');
    onApply({ nome: '', cpf: '', status: '' });
    onClose();
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
            <Text style={styles.sectionTitle}>Nome</Text>
            <Input
              name=""
              style={styles.textInput}
              placeholder="Digite o nome"
              value={nome}
              onChangeText={setNome}
            />
            <Spacer />
            <Text style={styles.sectionTitle}>CPF</Text>
            <Input
              name=""
              style={styles.textInput}
              placeholder="Digite o CPF"
              value={CPF}
              mask={Masks.BRL_CPF}
              onChangeText={setCPF}
            />

            <Spacer />
            <Text style={styles.sectionTitle}>Status</Text>
            <View
              style={{
                ...styles.optionsContainer,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedStatus === 'PENDENTE' && styles.optionButtonSelected,
                ]}
                onPress={() => handleSelectStatus('PENDENTE')}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedStatus === 'PENDENTE' && styles.optionTextSelected,
                  ]}
                >
                  PENDENTE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedStatus === 'FINALIZADO' &&
                    styles.optionButtonSelected,
                ]}
                onPress={() => handleSelectStatus('FINALIZADO')}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedStatus === 'FINALIZADO' &&
                      styles.optionTextSelected,
                  ]}
                >
                  FINALIZADO
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Spacer />
          <View style={styles.buttonContainer}>
            <Button
              text="Aplicar Filtros"
              onPress={handleApply}
              variant="quinary"
            />
            <View style={{ height: 8 }} />
            <Button
              text="Limpar"
              variant="secondary"
              onPress={handleClearFilters}
            />
          </View>
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: theme.colors.primary.gray,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '48%',
  },
  optionButtonSelected: {
    backgroundColor: theme.colors.primary.quaternary,
  },
  optionText: {
    fontSize: 14,
    color: theme.colors.primary.graySecondary,
  },
  optionTextSelected: {
    color: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

export default ProjectFilterModal;
