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
import SelectDrop from '@components/SelectDrop';
import { UF_OPTIONS } from '@utils/normalilze';

export interface FilterCriteria {
  uf: string;
  cidade: string;
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
  const [uf, setUf] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [selectedUFVisible, setSelectedUFVisible] = useState(false);

  const handleApply = () => {
    onApply({ uf, cidade });
    onClose();
  };
  const handleClearFilters = () => {
    setUf('');
    setCidade('');
    onApply({ uf: '', cidade: '' });
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
            {/* Filtro: UF */}
            <Text style={styles.sectionTitle}>UF</Text>
            <SelectDrop
              title="Selecione o UF"
              options={UF_OPTIONS}
              visible={selectedUFVisible}
              setVisible={setSelectedUFVisible}
              setSelected={setUf}
              selected={uf}
            />

            {/* Filtro: Cidade */}
            <Text style={styles.sectionTitle}>Cidade</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite a cidade"
              value={cidade}
              onChangeText={setCidade}
            />
          </ScrollView>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
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
  buttonContainer: {
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

export default ProjectFilterModal;
