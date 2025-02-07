import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import Typograph from '../Typograph';

interface CheckboxProps {
  control?: any;
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ control, name, label }) => {
  const renderCheckbox = (field: any) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => field.onChange(!field.value)}
    >
      <View style={[styles.checkbox, field.value && styles.checked]}>
        {field.value && (
          <Feather name="check" size={20} color={theme.colors.text.onPrimary} />
        )}
      </View>
      <Typograph variant="body" style={styles.label} fontWeight={'400'}>
        {label}
      </Typograph>
    </TouchableOpacity>
  );

  return control ? (
    <Controller
      control={control}
      render={({ field }) => renderCheckbox(field)}
      name={name}
    />
  ) : (
    renderCheckbox({ value: false, onChange: () => {} })
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.tertiary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: theme.colors.tertiary.main,
  },
  label: {
    color: theme.colors.text.secondary,
  },
});

export default Checkbox;
