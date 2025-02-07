import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import Typograph from '../Typograph';

interface MultiSelectorProps {
  options: { label: string; value: string }[];
  setSelected: (value: string) => void;
  selected: string;
}

const MultiSelector: React.FC<MultiSelectorProps> = ({
  options,
  selected,
  setSelected,
}) => {
  const itemWidth = `${100 / options.length}%`;
  return (
    <View style={styles.container}>
      {options.map((item) => {
        const isSelected = item.value === selected;
        return (
          <TouchableOpacity
            key={item.value}
            style={[
              isSelected
                ? styles.MultiSelectorContainerSelected
                : styles.MultiSelectorContainer,
              { width: itemWidth },
            ]}
            onPress={() => setSelected(item.value)}
          >
            <Typograph
              variant="body"
              fontWeight={'500'}
              color={
                isSelected
                  ? theme.colors.background
                  : theme.colors.text.secondary
              }
            >
              {item.label}
            </Typograph>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 50,
    marginHorizontal: 8,

    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    elevation: 1,
    gap: 8,
    height: 40,
    shadowColor: '#0005',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  MultiSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',

    justifyContent: 'center',
    backgroundColor: '#F4F4F5',
    borderRadius: 50,
  },
  MultiSelectorContainerSelected: {
    flexDirection: 'row',
    borderRadius: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary.quaternary,
    elevation: 1,
    shadowColor: '#0007',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default MultiSelector;
