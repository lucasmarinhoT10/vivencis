import React, { useEffect, useState } from 'react';
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
import useProjectsStore from 'src/store/projectsStore';
import SelectDrop from '@components/SelectDrop';

interface ProjectFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (criteria: FilterCriteriaShip) => void;
  filters?: FilterCriteriaShip | undefined;
}
export interface FilterCriteriaShip {
  id_projeto?: number;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}
const ShipmentsFilterModal: React.FC<ProjectFilterModalProps> = ({
  visible,
  onClose,
  onApply,
  filters,
}) => {
  const { projects } = useProjectsStore();
  const [visiblePro, setVisiblePro] = useState(false);
  const [projeto, setProjeto] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [dataInicio, setDataInicio] = useState<string>();
  const [dataFim, setDataFim] = useState<string>();
  useEffect(() => {
    setProjeto(
      projects?.find((it) => it?.id_projeto === filters?.id_projeto)
        ?.nome_projeto
    );
    setSelectedStatus(filters?.status);
    setDataInicio(filters?.dataInicio);
    setDataFim(filters?.dataFim);
  }, [filters]);
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
            <Text style={styles.sectionTitle}>Projeto</Text>
            <SelectDrop
              title="Selecione o projeto"
              options={projects?.map((it) => it?.nome_projeto) as any}
              visible={visiblePro}
              setVisible={setVisiblePro}
              setSelected={setProjeto}
              selected={projeto}
            />
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

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ width: '48%' }}>
                <Text style={styles.sectionTitle}>Data Inicio</Text>
                <MaskInput
                  style={styles.textInput}
                  placeholder="DD/MM/AAAA"
                  value={dataInicio}
                  onChangeText={setDataInicio}
                  mask={[
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                />
              </View>
              <View style={{ width: '48%' }}>
                <Text style={styles.sectionTitle}>Data Fim</Text>
                <MaskInput
                  style={styles.textInput}
                  placeholder="DD/MM/AAAA"
                  value={dataFim}
                  onChangeText={setDataFim}
                  mask={[
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                />
              </View>
            </View>
          </ScrollView>
          <Button
            text="Aplicar Filtros"
            variant="quinary"
            onPress={() => {
              onApply({
                id_projeto: projects?.find((it) => it?.nome_projeto === projeto)
                  ?.id_projeto,
                status: selectedStatus,
                dataFim,
                dataInicio,
              });
              onClose();
            }}
            style={{ marginTop: 15 }}
          />
          <Button
            text="Limpar filtro"
            variant="secondary"
            onPress={() => {
              onApply({
                id_projeto: undefined,
                status: undefined,
                dataFim: undefined,
                dataInicio: undefined,
              });
              setSelectedStatus(undefined);
              setProjeto(undefined);
              setDataFim(undefined);
              setDataInicio(undefined);
              onClose();
            }}
            style={{ marginTop: 15 }}
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
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 12,
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
});

export default ShipmentsFilterModal;
