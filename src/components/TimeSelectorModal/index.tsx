import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import Button from '@components/Button';
import { theme } from '../../theme/theme';

interface DateInputProps {
  control: any;
  name: string;
  placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  control,
  name,
  placeholder = 'Selecionar Data',
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <View>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            <Text
              style={{
                color: field.value
                  ? theme.colors.text.primary
                  : theme.colors.border,
              }}
            >
              {field.value
                ? new Date(field.value).toLocaleDateString()
                : placeholder}
            </Text>
            <Feather
              name="calendar"
              size={20}
              color={theme.colors.border}
              style={styles.iconRight}
            />
          </TouchableOpacity>

          <Modal visible={showDatePicker} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={tempDate || field.value || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) =>
                    setTempDate(selectedDate || field.value)
                  }
                />
                <Button
                  variant="primary"
                  onPress={() => {
                    if (tempDate) {
                      field.onChange(tempDate);
                    }
                    setShowDatePicker(false);
                  }}
                  text="Concluir"
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
    />
  );
};

interface TimeInputProps {
  control: any;
  name: string;
  placeholder?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  control,
  name,
  placeholder = 'Selecionar Hora',
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState<Date | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <View>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.input}
          >
            <Text
              style={{
                color: field.value
                  ? theme.colors.text.primary
                  : theme.colors.border,
              }}
            >
              {field.value
                ? new Date(field.value).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : placeholder}
            </Text>
            <Feather
              name="clock"
              size={20}
              color={theme.colors.border}
              style={styles.iconRight}
            />
          </TouchableOpacity>

          <Modal visible={showTimePicker} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={tempTime || field.value || new Date()}
                  mode="time"
                  display="spinner"
                  onChange={(event, selectedTime) =>
                    setTempTime(selectedTime || field.value)
                  }
                />
                <Button
                  variant="primary"
                  onPress={() => {
                    if (tempTime) {
                      field.onChange(tempTime);
                    }
                    setShowTimePicker(false);
                  }}
                  text="Concluir"
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.sizes.small,
    paddingVertical: theme.sizes.extraSmall,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    backgroundColor: theme.colors.surface,
  },
  iconRight: {
    marginLeft: 'auto',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    width: 300,
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
});

export { DateInput, TimeInput };
