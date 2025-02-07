import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';

export const SwitchOption = ({ value, onValueChange, children }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.childrenContainer}>{children}</View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={styles.switchStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  childrenContainer: {
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  switchStyle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
