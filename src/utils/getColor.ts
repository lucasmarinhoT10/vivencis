import { theme } from '@theme/theme';

export const getColor = (color: keyof typeof theme.colors | string): string => {
  if (typeof color === 'string') {
    const colorPath = color.split('.');

    if (colorPath.length === 2) {
      const [colorGroup, colorVariant] = colorPath as [
        keyof typeof theme.colors,
        string,
      ];

      const colorObject = theme.colors[colorGroup];

      if (typeof colorObject === 'object' && colorVariant in colorObject) {
        return colorObject[colorVariant as keyof typeof colorObject] as string;
      }

      if (typeof colorObject === 'object' && 'main' in colorObject) {
        return colorObject.main;
      }

      return color;
    }

    const simpleColor = theme.colors[color as keyof typeof theme.colors];
    if (typeof simpleColor === 'string') {
      return simpleColor;
    }

    if (typeof simpleColor === 'object' && 'main' in simpleColor) {
      return simpleColor.main;
    }

    return color;
  }

  return color;
};
