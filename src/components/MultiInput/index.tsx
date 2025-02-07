import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Controller, useFieldArray } from 'react-hook-form';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';
import Button from '@components/Button';

interface MultiInputProps {
  control: any;
  name: string;
  placeholder?: string;
  error?: string;
  editable?: boolean;
}

const MultiInput: React.FC<MultiInputProps> = ({
  control,
  name,
  placeholder = 'Digite aqui...',
  error,
  editable = true,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      {fields.map((field, index) => (
        <View key={field.id} style={styles.inputContainer}>
          <Controller
            control={control}
            name={`${name}.${index}.value`}
            render={({ field }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: error
                      ? theme.colors.error.main
                      : theme.colors.border,
                  },
                ]}
                placeholder={placeholder}
                value={field.value}
                onChangeText={field.onChange}
                editable={editable}
              />
            )}
          />
          <TouchableOpacity
            style={styles.removeIcon}
            onPress={() => remove(index)}
          >
            <Feather name="x" size={20} color={theme.colors.error.main} />
          </TouchableOpacity>
        </View>
      ))}

      <Button
        variant="tertiary"
        onPress={() => append({ value: '' })}
        text="Adicionar mais"
        left={() => (
          <MaterialIcons
            name="add"
            size={20}
            color={theme.colors.primary.main}
          />
        )}
      />

      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
    marginBottom: theme.sizes.small,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.small,
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.sizes.small,
    paddingVertical: theme.sizes.extraSmall,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    backgroundColor: theme.colors.surface,
    fontSize: theme.typography.body.fontSize,
  },
  removeIcon: {
    marginLeft: theme.sizes.small,
  },
  errorMessage: {
    color: theme.colors.error.main,
    marginTop: theme.sizes.extraSmall,
  },
});

export default MultiInput;
