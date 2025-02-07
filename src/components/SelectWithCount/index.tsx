import { theme } from '@theme/theme';
import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import SelectDrop from '@components/SelectDrop';

export const SelectWithQuantity = ({
  value,
  onChange,
  options,
  mediumSize,
}: {
  value: { material: string; quantity: string };
  onChange: (newValue: { material: string; quantity: string }) => void;
  options: string[];
  mediumSize: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.selectWithQuantityContainer}>
      <View style={mediumSize ? styles.row2 : styles.row}>
        <SelectDrop
          options={options}
          setVisible={setIsOpen}
          visible={isOpen}
          selected={value.material}
          setSelected={(newValue: string) =>
            onChange({ ...value, material: newValue })
          }
          title="Selecione"
          noBorder
          size={100}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '95%',
    gap: 8,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '95%',
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#0aa',
  },

  selectWithQuantityContainer: {},
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    alignItems: 'center',
  },
  addButtonText: {
    color: theme.colors.primary.quaternary,
    fontSize: 16,
  },
});
