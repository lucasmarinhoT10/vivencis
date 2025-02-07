import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typograph from '@components/Typograph';

interface ChipProps {
  text: string;
  color: any;
  style: any;
}

const Chip: React.FC<ChipProps> = ({ text, color, style }) => {
  return (
    <View style={[styles.chipContainer, { backgroundColor: color }, style]}>
      <Typograph variant="body" color="text.onPrimary" fontWeight="600">
        {text}
      </Typograph>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chipContainer: {
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 200,
    height: 38,
  },
});
