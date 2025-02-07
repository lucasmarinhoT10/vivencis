// theme/theme.js
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 360;

function normalize(size: number) {
  return Math.round(size * scale);
}

export const theme = {
  colors: {
    primary: {
      main: '#6200EE',
      dark: '#3700B3',
      light: '#BB86FC',
      button: '#04724D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#03DAC6',
      dark: '#018786',
      light: '#B2DFDB',
      carousel: '#D9D9D9',
      contrastText: '#000000',
      subtitle: '#4D4D4D',
    },
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: {
      main: '#B00020',
      dark: '#9B0000',
      light: '#E57373',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
      onPrimary: '#FFFFFF',
      onSecondary: '#000000',
    },
    border: '#E0E0E0',
    success: '#4CAF50',
  },
  typography: {
    title: {
      fontSize: normalize(24),
      lineHeight: normalize(32),
    },
    body: {
      fontSize: normalize(16),
      lineHeight: normalize(24),
    },
    caption: {
      fontSize: normalize(12),
      lineHeight: normalize(16),
    },
  },
  sizes: {
    small: normalize(8),
    medium: normalize(16),
    large: normalize(24),
  },
};
