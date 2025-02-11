import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Container from '@components/Container';
import { theme } from '@theme/theme';
import { fetchShipments } from '../services/shipments.services';
import useUserStore from 'src/store/userStore';
// Caso não possua o componente Typograph, você pode substituir por Text do react-native
import Typograph from '@components/Typograph';

interface Item {
  codigo: number;
  descricao: string;
  quantidade: number;
  serializado: string;
  seriais: string[];
}

interface Remessa {
  id_remessa: number;
  identificador: string;
  data: string;
  status: string;
  id_projeto: number;
  projeto: string;
  cidade: string;
  uf: string;
  itens: Item[];
}

interface ShipmentsData {
  paginas: number;
  pg: number;
  registros: number;
  offset: number;
  remessas: Remessa | Remessa[];
}

export default function InventoryScreen() {
  const [data, setData] = useState<Item[]>([]);
  const [shipments, setShipments] = useState<ShipmentsData | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUserStore();

  function getItensFinalizadas(data: ShipmentsData): Item[] {
    const groupedItems: { [codigo: number]: Item } = {};

    const remessasArray: Remessa[] = Array.isArray(data.remessas)
      ? data.remessas
      : [data.remessas];

    remessasArray.forEach((remessa) => {
      if (remessa.status === 'FINALIZADA' && Array.isArray(remessa.itens)) {
        remessa.itens.forEach((item) => {
          if (groupedItems[item.codigo]) {
            groupedItems[item.codigo].quantidade += item.quantidade;
          } else {
            groupedItems[item.codigo] = { ...item };
          }
        });
      }
    });

    return Object.values(groupedItems);
  }

  const generateRandomColor = (index: number): string => {
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  useEffect(() => {
    if (shipments) {
      setData(getItensFinalizadas(shipments));
    }
  }, [shipments]);

  const getShipments = async () => {
    await fetchShipments({
      id_parceiro: user?.id_entidade,
      setLoading,
      setShipments,
      perPage: 10000000000,
    });
  };

  useEffect(() => {
    getShipments();
  }, []);

  return (
    <Container
      scrollEnabled
      title="Inventário"
      hasGoBack
      spacerVertical="small"
    >
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 100 }} />
      ) : (
        <View style={styles.card}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => `${item.codigo}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <View
                  style={[
                    styles.colorIndicator,
                    { backgroundColor: generateRandomColor(index) },
                  ]}
                />
                <Typograph style={styles.itemLabel}>{item.descricao}</Typograph>
                <Typograph style={styles.itemValue}>
                  {item.quantidade}
                </Typograph>
              </View>
            )}
          />
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
    shadowColor: theme.colors.primary.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 10,
    shadowRadius: 3,
    padding: 12,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 16,
  },
  titleSucess: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
  link: {
    textAlign: 'center',
  },
  containerSucess: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardSucess: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: theme.colors.primary.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 22,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  itemLabel: {
    fontSize: 14,
    color: theme.colors.primary.placeholder,
    flex: 1,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.primary.placeholder,
  },
});
