import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import Typograph from '../Typograph';

interface RadioButtonProps {
  control: any;
  name: string;
  options: { label: string; value: string }[];
  multiple?: boolean;
}

const RadioGroup: React.FC<RadioButtonProps> = ({
  control,
  name,
  options,
  multiple = false,
}) => {
  const renderRadioButton = (field: any, optionValue: string) => {
    const isSelected = multiple
      ? field.value?.includes(optionValue)
      : field.value === optionValue;

    const handlePress = () => {
      if (multiple) {
        const newValue = isSelected
          ? field.value.filter((v: string) => v !== optionValue)
          : [...(field.value || []), optionValue];
        field.onChange(newValue);
      } else {
        field.onChange(optionValue);
      }
    };

    return (
      <TouchableOpacity
        key={optionValue}
        style={styles.radioButtonContainer}
        onPress={handlePress}
      >
        <View
          style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}
        >
          {isSelected && (
            <Feather
              name="check"
              size={14}
              color={theme.colors.text.onPrimary}
            />
          )}
        </View>
        <Typograph variant="body" style={styles.label} fontWeight={'500'}>
          {options.find((opt) => opt.value === optionValue)?.label}
        </Typograph>
      </TouchableOpacity>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <View>
          {options.map((option) => renderRadioButton(field, option.value))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.sizes.medium,
    marginBottom: theme.sizes.extraSmall,
  },
  radioCircle: {
    width: 18,
    height: 18,
    flexDirection: 'row',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: theme.colors.tertiary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioCircleSelected: {
    backgroundColor: theme.colors.tertiary.main,
  },
  label: {
    color: theme.colors.text.secondary,
    flexDirection: 'row',
  },
});

export default RadioGroup;
