import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import MaskInput, { Masks } from 'react-native-mask-input';

interface InputDataProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onIconPress?: () => void;
  editable?: boolean;
}

export const InputData: React.FC<InputDataProps> = ({
  placeholder,
  value,
  onChangeText,
  onIconPress,
  editable,
}) => {
  return (
    <View style={styles.container}>
      <MaskInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme?.colors.primary.placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        mask={Masks.DATE_DDMMYYYY}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={onIconPress}>
        <MaterialIcons name="date-range" size={24} color="#0A234C" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});
