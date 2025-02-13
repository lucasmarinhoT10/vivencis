import { Dimensions, Platform, PixelRatio } from 'react-native';

export const normalize = (pixelsToConvert: number) => {
  const scale = Dimensions.get('window').width / 360;
  const newSize = pixelsToConvert * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const isValidDate = (dateString: string): boolean => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;

  const [, day, month, year] = dateString.match(regex)!;
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  // Verifica se o mês está entre 1 e 12
  if (m < 1 || m > 12) return false;

  const monthLengths = [
    31,
    (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return d > 0 && d <= monthLengths[m - 1];
};

export interface DateValidationResult {
  value: string;
  error: string | null;
}

export function formatAndValidateDateInput(
  newText: string,
  oldValue: string,
  allowPastDates: boolean
): DateValidationResult {
  if (newText.length < oldValue.length) {
    return { value: newText, error: null };
  }

  const digits = newText.replace(/\D/g, '');

  let formatted = '';
  if (digits.length <= 2) {
    formatted = digits;
  } else if (digits.length <= 4) {
    formatted = digits.slice(0, 2) + '/' + digits.slice(2);
  } else {
    formatted =
      digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4, 8);
  }

  if (digits.length >= 2) {
    const day = parseInt(digits.slice(0, 2), 10);
    if (isNaN(day) || day < 1 || day > 31) {
      return { value: oldValue, error: 'Dia inválido' };
    }
  }

  if (digits.length >= 4) {
    const month = parseInt(digits.slice(2, 4), 10);
    if (isNaN(month) || month < 1 || month > 12) {
      return { value: oldValue, error: 'Mês inválido' };
    }
  }

  if (digits.length >= 8) {
    const day = parseInt(digits.slice(0, 2), 10);
    const month = parseInt(digits.slice(2, 4), 10);
    const year = parseInt(digits.slice(4, 8), 10);

    const maxDay = new Date(year, month, 0).getDate(); // Retorna o último dia do mês
    if (day > maxDay) {
      return { value: oldValue, error: `Dia inválido para o mês ${month}` };
    }

    if (!allowPastDates) {
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate < today) {
        return { value: oldValue, error: 'Data não pode ser anterior a hoje' };
      }
    }
  }

  return { value: formatted, error: null };
}

export const UF_OPTIONS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];
