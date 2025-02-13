import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import { theme } from '../../theme/theme';
import Line from '@components/Line';
import { AntDesign, Feather } from '@expo/vector-icons';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';

interface InputProps {
  title: string;
  options: string[];
  visible: boolean;
  setVisible: (value: boolean) => void;
  setSelected: (value: string) => void;
  selected?: string | undefined;
  label?: string;
  editable?: boolean;
  noBorder?: boolean;
  size?: number;
  error?: string;
}

const SelectDrop: React.FC<InputProps> = ({
  title,
  options,
  visible,
  setVisible,
  selected,
  setSelected,
  editable = true,
  label,
  noBorder,
  size,
  error,
}) => {
  const [showErrorTooltip, setShowErrorTooltip] = useState(false);

  const handleVisible = () => {
    if (editable) {
      setVisible(!visible);
    }
  };
  const toggleErrorTooltip = () => {
    setShowErrorTooltip(!showErrorTooltip);
  };
  const renderItem = (item: any) => {
    const onPressItem = (item: any) => {
      setSelected(item);
      setVisible(false);
    };
    return (
      <View key={item}>
        <TouchableOpacity
          style={[
            styles.item,
            size ? { width: `${size}%` } : { width: '100%' },
          ]}
          onPress={() => onPressItem(item)}
        >
          <Typograph
            variant="options"
            fontWeight={selected === item ? '600' : '400'}
            textAlign="left"
            color={
              selected === item
                ? theme.colors.text.secondary
                : theme.colors.text.onTertiary
            }
          >
            {item}
          </Typograph>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {label && (
        <>
          <Typograph variant="caption" color={theme.colors.text.primary}>
            {label}
          </Typograph>
          <Spacer />
        </>
      )}

      {/* Container do dropdown */}
      <View
        style={[
          noBorder ? styles.inputContainerWithoutBorder : styles.inputContainer,
        ]}
      >
        {/* Cabeçalho que abre/fecha o dropdown */}
        <TouchableOpacity
          onPress={handleVisible}
          activeOpacity={editable ? 0.7 : 1}
        >
          <View
            style={[
              styles.itemTitle,
              size ? { width: `${size}%` } : { width: '100%' },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Typograph
                variant="body"
                color={
                  selected
                    ? theme.colors.text.primary
                    : theme.colors.primary.placeholder
                }
                numberOfLines={1}
                textAlign="left"
              >
                {selected || title}
              </Typograph>
            </View>
            {error && (
              <TouchableOpacity
                onPress={toggleErrorTooltip}
                style={{ marginRight: 12 }}
              >
                <Feather
                  name="alert-circle"
                  size={24}
                  color={theme.colors.error.main}
                />
              </TouchableOpacity>
            )}
            <AntDesign
              name={visible ? 'up' : 'down'}
              size={16}
              color={theme.colors.primary.placeholder}
            />
          </View>
        </TouchableOpacity>

        {/* Tooltip de erro */}
        {error && showErrorTooltip && (
          <View style={styles.tooltip}>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        {/* Lista de opções */}
        {visible && editable && (
          <View style={{ height: 120, width: '100%' }}>
            <ScrollView
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {options.map((it) => renderItem(it))}
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: theme.colors.text.onPrimary,
  },
  inputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'space-between',
    borderRadius: 6,
  },
  tooltip: {
    position: 'absolute',
    right: 50,
    top: -20,
    backgroundColor: theme.colors.error.main,
    padding: 8,
    borderRadius: 4,
  },
  inputContainerWithoutBorder: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 6,
  },
  item: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: theme.sizes.extraSmall,
    paddingHorizontal: theme.sizes.extraExtraSmall,
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: theme.sizes.extraExtraSmall,
  },
  errorText: {
    marginTop: 4,
    marginLeft: theme.spacing.extraSmall,
  },
});

export default SelectDrop;
