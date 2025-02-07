import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  TextProps,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme/theme';
import Typograph from '../Typograph';

interface ButtonProps extends TextProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
  textAlign?: 'left' | 'right' | 'center';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  text?: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  left?: () => React.ReactNode;
  right?: () => React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  color?: string;
  halfWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  textAlign = 'center',
  loading = false,
  disabled = false,
  onPress,
  text = '',
  fontWeight = '500',
  left,
  right,
  fullWidth = false,
  style,
  color,
  halfWidth = false,
  justifyContent,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.button];
    if (disabled) baseStyles.push(styles.disabled);

    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }
    if (halfWidth) {
      baseStyles.push(styles.halfWidth);
    }

    switch (variant) {
      case 'primary':
        baseStyles.push(styles.primary);
        break;
      case 'secondary':
        baseStyles.push(styles.secondary);
        break;
      case 'tertiary':
        baseStyles.push(
          textAlign === 'center' ? styles.tertiary : styles.tertiaryNoPadding
        );
        break;
      case 'quaternary':
        baseStyles.push(styles.quaternary);
        break;
      case 'quinary':
        baseStyles.push(styles.quinary);
        break;
      default:
        baseStyles.push(styles.primary);
    }

    return baseStyles;
  };

  const contentStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: getJustifyContent(justifyContent, textAlign, left, right),
    flex: 1,
  };

  const getTextColor = (): string => {
    if (color) {
      return color;
    }
    switch (variant) {
      case 'primary':
        return theme.colors.text.onQuaternary;
      case 'secondary':
        return theme.colors.primary.link;

      case 'tertiary':
        return theme.colors.text.tertiary;

      case 'quaternary':
        return theme.colors.text.onQuaternary;
      default:
        return theme.colors.text.onPrimary;
    }
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={!disabled && !loading ? onPress : undefined}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View style={contentStyle}>
        {left && <View style={styles.icon}>{left()}</View>}
        {loading ? (
          <ActivityIndicator color={color || theme.colors.text.onPrimary} />
        ) : (
          <Typograph
            variant={'body'}
            fontWeight={fontWeight}
            color={getTextColor()}
            style={{ textAlign }}
          >
            {text}
          </Typograph>
        )}
        {right && <View style={styles.icon}>{right()}</View>}
      </View>
    </TouchableOpacity>
  );
};

const getJustifyContent = (
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between',
  textAlign?: 'left' | 'right' | 'center',
  left?: () => React.ReactNode,
  right?: () => React.ReactNode
): ViewStyle['justifyContent'] => {
  if (justifyContent) {
    return justifyContent;
  }
  if (left && right) {
    return 'space-between';
  }
  if (textAlign === 'left' && !left) {
    return 'flex-start';
  }
  if (textAlign === 'left') {
    return left ? 'flex-start' : 'center';
  }
  if (textAlign === 'right') {
    return right ? 'flex-end' : 'center';
  }
  return 'center';
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary.main,
  },

  secondary: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary.link,
    borderWidth: 1,
  },

  quinary: {
    backgroundColor: theme.colors.primary.button,
  },

  tertiary: {
    backgroundColor: 'transparent',
  },
  tertiaryNoPadding: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    textDecorationLine: 'none',
  },
  quaternary: {
    backgroundColor: theme.colors.primary.quaternary,
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  disabled: {
    opacity: 0.7,
  },
  icon: {
    marginHorizontal: theme.spacing.medium,
  },
});

export default Button;
