import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import Button from '@components/Button';
import SelectDrop from '@components/SelectDrop';
import { InputData } from '@components/InputData';
import Spacer from '@components/Spacer';

interface ModalConfirmationProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  itemsSelect?: Array<string | undefined>;
  technicians: any;
  filter: any;
  setFilter: any;
}
const filters = {
  filter_status: [
    'AGUARDANDO SEPARAÇÃO',
    'PENDENTE',
    'TÉCNICO ATRIBUÍDO',
    'DEVOLVIDO',
    'AGUARDANDO SAT HD REGIONAL',
    'CORRIGIR INSTALAÇÃO',
    'AGUARDANDO FINALIZAÇÃO',
    'AGUARDANDO ENTREGA AO PARCEIRO',
    'CONFORMIDADE',
    'NÃO CONFORMIDADE',
    'EM ANÁLISE PELO RADAR',
    'TRATATIVA CTI',
    'CORRIGIR IMPRODUTIVA',
    'AGUARDANDO TRATATIVA EAF',
  ],
  filter_estagio: [
    'PENDENTE',
    'AGUARDANDO ATENDIMENTO',
    'ANDAMENTO',
    'EXECUTADO',
    'FINALIZADO',
    'DEVOLVIDA',
  ],
  filter_tipo: ['INSTALAÇÃO', 'ATG', 'CONTESTAÇÃO', 'ATG-I'],
  filter_origem: [
    'NORMAL',
    'REAGENDAMENTO',
    'TRATATIVA RADAR',
    'REABERTURA',
    'TRATATIVA CTI',
    'INTERFERENCIA 5G',
    'TEC.NAO COMPARECEU',
  ],
  filter_prazo: ['VENCIDO', 'VENCENDO HOJE', 'FUTURAS'],
  filter_grupostatus: [
    'AGUARDANDO ATENDIMENTO',
    'CORREÇÃO',
    'EXECUTADA',
    'INSTALADA',
    'IMPRODUTIVA',
    'CANCELADA',
    'CTI',
  ],
};
export const FilterModal: React.FC<ModalConfirmationProps> = ({
  filter,
  setFilter,
  visible,
  onClose,
  title,
  itemsSelect,
  technicians,
}) => {
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [selectedVisibleTech, setSelectedVisibleTech] = useState(false);
  const [selectedTecno, setSelectedTecno] = useState(filter?.tecnico);
  const [selectedProjeto, setSelectedProjeto] = useState(filter?.projeto);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedStatusGrupo, setSelectedStatusGrupo] = useState<string>(
    filter?.grupo_status ?? ''
  );
  const [selectedEstagio, setSelectedEstagio] = useState<string[]>([]);
  const [selectedServico, setSelectedServico] = useState<string[]>([]);
  const [selectedPrazo, setSelectedPrazo] = useState<string[]>([]);
  const [selectedOrigem, setSelectedOrigem] = useState<string[]>([]);
  const handleFilters = () => {
    setFilter({
      tecnico: selectedTecno,
      projeto: selectedProjeto,
      // status: selectedStatus,
      grupo_status: selectedStatusGrupo,
      // estagio: selectedEstagio,
      // servico: selectedServico,
      // prazo: selectedPrazo,
      // origem: selectedOrigem,
    });
    onClose();
  };
  const handleSelectStatusButton = (id: string) => {
    setSelectedStatus((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  };
  const handleSelectOrigemButton = (id: string) => {
    setSelectedOrigem((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  };
  const handleSelectEstagioButton = (id: string) => {
    setSelectedEstagio((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  };
  const handleSelectStatusGrupoButton = (id: string) => {
    if (id === selectedStatusGrupo) {
      setSelectedStatusGrupo('');
    } else {
      setSelectedStatusGrupo(id);
    }
  };
  const handleSelectServicoButton = (id: string) => {
    setSelectedServico((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  };
  const handleSelectPrazoButton = (id: string) => {
    setSelectedPrazo((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSelectedTecno('');
    setSelectedProjeto('');
    setSelectedStatus([]);
    setSelectedStatusGrupo('');
    setSelectedEstagio([]);
    setSelectedServico([]);
    setSelectedPrazo([]);
    setSelectedOrigem([]);
    setFilter({});
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.rowTitle}>
            <View />
            <View style={styles.title}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={onClose}>
              <AntDesign
                name="close"
                size={18}
                style={styles.close}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View>
              <View style={styles.sectionInput}>
                <Text style={styles.inputLabel}>Projeto</Text>
                <SelectDrop
                  title="Selecione"
                  options={itemsSelect as any}
                  visible={selectedVisible}
                  setVisible={setSelectedVisible}
                  setSelected={setSelectedProjeto}
                  selected={selectedProjeto}
                />
              </View>

              {/* <View style={styles.sectionInput}>
                <Text style={styles.titleLabel}>Serviço</Text>
                <FlatList
                  data={filters.filter_tipo}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected = selectedServico?.includes(item);
                    return (
                      <TouchableOpacity
                        onPress={() => handleSelectServicoButton(item)}
                        style={[
                          isSelected
                            ? styles.optionButton
                            : styles.optionButtonSelect,
                        ]}
                      >
                        <Text
                          style={[
                            isSelected
                              ? styles.textOptionButton
                              : styles.textOptionButtonSelect,
                            { fontSize: 10 },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View> */}
              {/* <View style={styles.sectionInput}>
                <Text style={styles.titleLabel}>Origem</Text>
                <FlatList
                  data={filters.filter_origem}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected = selectedOrigem?.includes(item);
                    return (
                      <TouchableOpacity
                        onPress={() => handleSelectOrigemButton(item)}
                        style={[
                          isSelected
                            ? styles.optionButton
                            : styles.optionButtonSelect,
                        ]}
                      >
                        <Text
                          style={[
                            isSelected
                              ? styles.textOptionButton
                              : styles.textOptionButtonSelect,
                            { fontSize: 10 },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View> */}

              {/* <View style={styles.sectionInput}>
                <Text style={styles.titleLabel}>Prazo</Text>
                <FlatList
                  data={filters.filter_prazo}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected = selectedPrazo?.includes(item);
                    return (
                      <TouchableOpacity
                        onPress={() => handleSelectPrazoButton(item)}
                        style={[
                          isSelected
                            ? styles.optionButton
                            : styles.optionButtonSelect,
                        ]}
                      >
                        <Text
                          style={[
                            isSelected
                              ? styles.textOptionButton
                              : styles.textOptionButtonSelect,
                            { fontSize: 10 },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
                <View style={styles.dateContainer}>
                  <View style={styles.dateInputContainer}>
                    <Text style={styles.inputLabel}>Início</Text>
                    <InputData
                      placeholder="10/10/2000"
                      value={startDate}
                      onChangeText={setStartDate}
                      onIconPress={() =>
                        console.log('Abrir calendário para início')
                      }
                    />
                  </View>
                  <View style={styles.dateInputContainer}>
                    <Text style={styles.inputLabel}>Até</Text>
                    <InputData
                      placeholder="10/10/2000"
                      value={endDate}
                      onChangeText={setEndDate}
                      onIconPress={() =>
                        console.log('Abrir calendário para término')
                      }
                    />
                  </View>
                </View> 
              </View>*/}

              {/* <View style={styles.sectionInput}>
                <Text style={styles.titleLabel}>Status</Text>
                <FlatList
                  data={filters.filter_status}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected = selectedStatus?.includes(item);
                    return (
                      <TouchableOpacity
                        onPress={() => handleSelectStatusButton(item)}
                        style={[
                          isSelected
                            ? styles.optionButton
                            : styles.optionButtonSelect,
                        ]}
                      >
                        <Text
                          style={[
                            isSelected
                              ? styles.textOptionButton
                              : styles.textOptionButtonSelect,
                            { fontSize: 10 },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                />
              </View>
              <View style={styles.sectionInput}>
                <Text style={styles.titleLabel}>Estágio</Text>
                <FlatList
                  data={filters.filter_estagio}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected = selectedEstagio?.includes(item);
                    return (
                      <TouchableOpacity
                        onPress={() => handleSelectEstagioButton(item)}
                        style={[
                          isSelected
                            ? styles.optionButton
                            : styles.optionButtonSelect,
                        ]}
                      >
                        <Text
                          style={[
                            isSelected
                              ? styles.textOptionButton
                              : styles.textOptionButtonSelect,
                            { fontSize: 10 },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                />
              </View> */}
              <View style={styles.sectionInput}>
                <Text style={styles.titleLabel}>Status de grupo</Text>
                <FlatList
                  data={filters.filter_grupostatus}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const isSelected = selectedStatusGrupo?.includes(item);
                    return (
                      <TouchableOpacity
                        onPress={() => handleSelectStatusGrupoButton(item)}
                        style={[
                          isSelected
                            ? styles.optionButton
                            : styles.optionButtonSelect,
                        ]}
                      >
                        <Text
                          style={[
                            isSelected
                              ? styles.textOptionButton
                              : styles.textOptionButtonSelect,
                            { fontSize: 10 },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                />
              </View>

              <View style={styles.sectionInput}>
                <Text style={styles.inputLabel}>Técnico</Text>
                <SelectDrop
                  title="Selecione o técnico"
                  options={technicians?.map((it) => it?.nome) as any}
                  visible={selectedVisibleTech}
                  setVisible={setSelectedVisibleTech}
                  setSelected={setSelectedTecno}
                  selected={selectedTecno}
                />
              </View>
            </View>
          </ScrollView>

          <Button
            variant="secondary"
            text="Confirmar"
            onPress={handleFilters}
            style={{
              height: 50,
              borderWidth: 1.5,
              borderColor: theme.colors.primary.button,
              borderRadius: 4,
              marginBottom: 10,
            }}
          />
          <Button
            variant="quinary"
            color={theme.colors.primary.contrastText}
            text="Limpar"
            onPress={handleClearFilters}
            style={{
              height: 50,
              borderWidth: 1.5,
              borderColor: theme.colors.primary.button,
              borderRadius: 4,
              marginBottom: 20,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  close: {},
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 20,
    width: '90%',
    maxHeight: '85%',
    marginTop: 30,
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  rowTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    marginLeft: 12,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.colors.primary.placeholder,
    marginBottom: 18,
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 2,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
  titleLabel: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.colors.primary.title,
    marginBottom: 18,
  },
  inputLabel: {
    color: theme.colors.primary.title,
    marginBottom: 8,
  },
  sectionInput: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: theme.colors.primary.quaternary,
    height: 28,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 8,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  optionButtonSelect: {
    marginRight: 8,
    marginTop: 8,
    backgroundColor: theme.colors.primary.gray,
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textOptionButton: {
    color: '#fff',
  },
  textOptionButtonSelect: {
    color: '#B3B3B3',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    flex: 1,
    marginRight: 10,
  },
});
