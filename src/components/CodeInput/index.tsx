import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

interface CodeInputProps {
  numberOfFields: number;
  onCodeComplete: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  numberOfFields,
  onCodeComplete,
}) => {
  const [code, setCode] = useState<string[]>(Array(numberOfFields).fill(''));
  const inputs: React.RefObject<TextInput>[] = Array(numberOfFields)
    .fill(null)
    .map(() => React.createRef<TextInput>());

  const handleChange = (text: string, index: number) => {
    const updatedCode = [...code];
    updatedCode[index] = text.slice(-1);
    setCode(updatedCode);

    if (text && index < numberOfFields - 1) {
      inputs[index + 1].current?.focus();
    }

    if (updatedCode.every((char) => char !== '')) {
      onCodeComplete(updatedCode.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((_, index) => (
        <TextInput
          key={index}
          ref={inputs[index]}
          style={[styles.input, { borderColor: theme.colors.border }]}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={code[index]}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.medium,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: theme.colors.surface,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
  },
  text: {
    // color: theme.colors.primary.link,
  },
});

export default CodeInput;
