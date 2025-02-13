import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInputProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import { theme } from '../../theme/theme';
import MaskInput from 'react-native-mask-input';

interface InputProps extends TextInputProps {
  control?: any;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  editable?: boolean;
  showSearchIcon?: boolean;
  isBigger?: boolean;
  isMedium?: boolean;
  value?: string;
  flex?: number;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  mask?: (string | RegExp)[];
  keyboard?: any;
}

const Input: React.FC<InputProps> = ({
  control,
  name,
  placeholder = '',
  secureTextEntry = false,
  error,
  editable = true,
  showSearchIcon = false,
  isBigger = false,
  value,
  isMedium = false,
  onChangeText,
  maxLength,
  flex,
  mask,
  keyboard,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showErrorTooltip, setShowErrorTooltip] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleErrorTooltip = () => {
    setShowErrorTooltip(!showErrorTooltip);
  };

  const getBorderColor = (): string => {
    if (error) {
      return theme.colors.error.main;
    }
    if (isFocused) {
      return theme.colors.primary.main;
    }
    return theme.colors.border;
  };

  const inputStyle = [
    flex ? { flex: flex, ...styles.input } : { flex: 1, ...styles.input },
    { borderColor: getBorderColor() },
    isBigger && styles.inputBigger,
    isMedium && styles.inputMedium,
  ];
  const renderInput = (field: any) => (
    <View style={styles.inputContainer}>
      {showSearchIcon && (
        <Feather
          name="search"
          size={24}
          color={theme.colors.border}
          style={styles.iconLeft}
        />
      )}
      {mask ? (
        <MaskInput
          style={[
            inputStyle,
            showSearchIcon && { paddingLeft: 40 },
            !editable && { color: theme.colors?.primary.placeholder },
          ]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={theme.colors.primary.placeholder}
          onBlur={() => {
            setIsFocused(false);
            field.onBlur();
          }}
          value={field.value}
          maxLength={maxLength}
          onChangeText={field.onChange}
          editable={editable}
          mask={mask}
          keyboardType={keyboard}
          {...rest}
        />
      ) : (
        <TextInput
          {...rest}
          style={[
            inputStyle,
            showSearchIcon && { paddingLeft: 40 },
            !editable && { color: theme.colors?.primary.placeholder },
          ]}
          placeholder={placeholder}
          keyboardType={keyboard}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={theme.colors.primary.placeholder}
          maxLength={maxLength}
          onBlur={() => setIsFocused(false)}
          value={field.value}
          onChangeText={(text) =>
            name === 'email'
              ? field.onChange(text?.trim())
              : field.onChange(text)
          }
          editable={editable}
          multiline={isBigger}
          textAlignVertical={isBigger ? 'top' : 'center'}
        />
      )}
      {secureTextEntry && !error && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconRight}
        >
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.border}
          />
        </TouchableOpacity>
      )}
      {error && (
        <TouchableOpacity onPress={toggleErrorTooltip} style={styles.iconRight}>
          <Feather
            name="alert-circle"
            size={24}
            color={theme.colors.error.main}
          />
        </TouchableOpacity>
      )}
      {error && showErrorTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
    </View>
  );

  return control ? (
    <Controller
      control={control}
      render={({ field }) => renderInput(field)}
      name={name}
    />
  ) : (
    <View style={styles.inputContainer}>
      {showSearchIcon && (
        <Feather
          name="search"
          size={24}
          color={theme.colors.border}
          style={styles.iconLeft}
        />
      )}

      {mask ? (
        <MaskInput
          {...rest}
          style={[inputStyle, showSearchIcon && { paddingLeft: 40 }]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={theme.colors.primary.placeholder}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          multiline={isBigger}
          textAlignVertical={isBigger ? 'top' : 'center'}
          mask={mask}
        />
      ) : (
        <TextInput
          {...rest}
          style={[inputStyle, showSearchIcon && { paddingLeft: 40 }]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={theme.colors.primary.placeholder}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          multiline={isBigger}
          textAlignVertical={isBigger ? 'top' : 'center'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: theme.sizes.small,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  input: {
    paddingVertical: theme.sizes.extraSmall,
    fontSize: theme.typography.body.fontSize,
    backgroundColor: 'transparent',
  },
  inputFlex: {
    flex: 0.7,
    paddingVertical: theme.sizes.extraSmall,
    fontSize: theme.typography.body.fontSize,
    backgroundColor: 'transparent',
  },
  inputBigger: {
    minHeight: 200,
    textAlignVertical: 'top',
  },
  inputMedium: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  iconLeft: {
    position: 'absolute',
    left: 16,
  },
  iconRight: {
    position: 'absolute',
    right: 16,
  },
  tooltip: {
    position: 'absolute',
    right: 40,
    top: -10,
    backgroundColor: theme.colors.error.main,
    padding: 8,
    borderRadius: 4,
  },
  errorMessage: {
    color: theme.colors.text.onPrimary,
  },
});

export default Input;
