// theme/theme.js
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 420;

function normalize(size: number) {
  return Math.round(size * scale);
}

export const theme = {
  colors: {
    primary: {
      main: '#233B81',
      title: '#0A234C',
      link: '#2A7287',
      quaternary: '#4397B0',
      gray: '#ECEDEF',
      extraLight: '#E0E7FF',
      contrastText: '#FFFFFF',
      bgOrderButton: '#F4F4F5',
      placeholder: '#707173',
      graySecondary: '#484C52',
      shadow: '#60617014',
      border: '#D4D4D8',
      button: '#2A7287',
      labelValue: '#121212',
      user: '#8CC7D9',
    },
    secondary: {
      main: '#03DAC6',
      dark: '#018786',
      light: '#B2DFDB',
      carousel: '#D9D9D9',
      contrastText: '#000000',
      subtitle: '#4D4D4D',
    },
    tertiary: {
      main: '#04724D',
      light: '#EDFDF8',
      contrastText: '#000000',
    },
    carousel: {
      cardPrimary: '#4397B0',
      cardSecondary: '#FFAD39',
      cardTertiary: '#08875D',
    },
    background: '#FFFF',

    surface: '#FFFFFF',
    error: {
      main: '#B00020',
      red: '#E02D3C',
      dark: '#9B0000',
      light: '#E57373',
    },
    text: {
      primary: '#000000',
      title: '#066042',
      titleSecondary: '#233B81',
      secondary: '#4D4D4D',
      description: '#484C52',
      tertiary: '#4397B0',

      onPrimary: '#FFFFFF',
      onSecondary: '#000000',
      onTertiary: '#808080',
      onQuaternary: '#ECEDEF',
    },
    border: '#E0E0E0',
    borderMedium: '#CCCCCC',
    success: '#4CAF50',
    warning: '#96530F',
  },
  typography: {
    semiTitle: {
      fontSize: normalize(18),
      lineHeight: normalize(26),
    },
    title: {
      fontSize: normalize(24),
      lineHeight: normalize(32),
    },
    body: {
      fontSize: normalize(16),
      lineHeight: normalize(24),
    },
    options: {
      fontSize: normalize(14),
      lineHeight: normalize(28),
    },
    caption: {
      fontSize: normalize(12),
      lineHeight: normalize(16),
    },
  },
  sizes: {
    extraExtraSmall: normalize(8),
    extraSmall: normalize(12),
    small: normalize(18),
    medium: normalize(24),
    large: normalize(32),
    extralarge: normalize(48),
  },
  spacing: {
    extraSmall: normalize(4),
    small: normalize(8),
    medium: normalize(16),
    large: normalize(24),
    doubleMedium: normalize(32),
    extraLarge: normalize(40),
  },
};
