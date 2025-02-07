import { theme } from '@theme/theme';
import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';

interface LineProps {
  progress: number; // Valor de progresso (0 a 1)
  height?: number;
  width?: DimensionValue;
  filledColor?: string;
  backgroundColor?: string;
}

const Line: React.FC<LineProps> = ({
  progress,
  height = 4,
  width = '100%',
  filledColor = theme.colors.primary.link,
  backgroundColor = theme.colors.primary.gray,
}) => {
  const styles = getStyles(
    height,
    width,
    filledColor,
    backgroundColor,
    progress
  );

  return (
    <View style={styles.container}>
      <View style={styles.filled} />
    </View>
  );
};

const getStyles = (
  height: number,
  width: DimensionValue,
  filledColor: string,
  backgroundColor: string,
  progress: number
) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: backgroundColor,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    filled: {
      height: height,
      width: `${progress * 100}%`, // Determina o progresso
      backgroundColor: filledColor,
      borderRadius: height / 2,
    },
  });

export default Line;
