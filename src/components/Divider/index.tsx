import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.medium,
  },
});

export default Divider;
