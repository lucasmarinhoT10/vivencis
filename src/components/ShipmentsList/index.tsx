import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Item {
  codigo: number;
  descricao: string;
  quantidade: number;
  seriais: any;
  serializado: 'N' | 'S';
}

interface ItemsListProps {
  title: string;
  data: Item[];
}

export const ShipmentsList: React.FC<ItemsListProps> = ({ title, data }) => {
  const predefinedColors = [
    '#5B8FF9',
    '#38CA81',
    '#FFB246',
    '#F96D5B',
    '#233B81',
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.descricao}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View
              style={[
                styles.colorIndicator,
                {
                  backgroundColor:
                    predefinedColors[index % predefinedColors.length],
                },
              ]}
            />

            <Typograph style={styles.itemLabel}>{item.descricao}</Typograph>
            <Typograph style={styles.itemValue}>{item.quantidade}</Typograph>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: theme.colors.primary.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary.title,
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
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
