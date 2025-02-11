import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { getColor } from '@utils/getColor';

interface TypographProps extends TextProps {
  variant?: 'title' | 'body' | 'caption' | 'options' | 'semiTitle';
  color?: keyof typeof theme.colors | string;
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
  children: React.ReactNode;
  underline?: boolean;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

const Typograph: React.FC<TypographProps> = ({
  variant = 'body',
  color = 'primary.title',
  fontWeight = 'normal',
  children,
  style,
  underline = false,
  textAlign = 'left',
  ...rest
}) => {
  const getFontFamily = () => {
    switch (fontWeight) {
      case '100':
        return 'Poppins_100Thin';
      case '200':
        return 'Poppins_200ExtraLight';
      case '300':
        return 'Poppins_300Light';
      case '400':
      case 'normal':
        return 'Poppins_400Regular';
      case '500':
        return 'Poppins_500Medium';
      case '600':
        return 'Poppins_600SemiBold';
      case '700':
      case 'bold':
        return 'Poppins_700Bold';
      case '800':
        return 'Poppins_800ExtraBold';
      case '900':
        return 'Poppins_900Black';
      default:
        return 'Poppins_400Regular';
    }
  };

  const textStyle: TextStyle = {
    color: getColor(color),
    fontFamily: getFontFamily(),
    textDecorationLine: underline ? 'underline' : 'none',
    textAlign,
  };

  return (
    <Text style={[styles[variant], textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.title.fontSize,
    lineHeight: theme.typography.title.lineHeight,
  },
  semiTitle: {
    fontSize: theme.typography.semiTitle.fontSize,
    lineHeight: theme.typography.semiTitle.lineHeight,
  },
  body: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  },
  options: {
    fontSize: theme.typography.options.fontSize,
    lineHeight: theme.typography.options.lineHeight,
  },
  caption: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.lineHeight,
  },
});

export default Typograph;
