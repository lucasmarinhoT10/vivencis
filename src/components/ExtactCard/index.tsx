import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  Foundation,
  MaterialIcons,
} from '@expo/vector-icons';
import { theme } from '@theme/theme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Typograph from '@components/Typograph';
import Icon from '@components/Icon';

interface ExtractCardProps {
  title: string;
  value: string;
  icon: 'check' | 'dollar' | 'hand-holding-dollar';
  width?: string | number;
}
export const ExtractCard = ({
  title,
  value,
  icon,
  width,
}: ExtractCardProps) => {
  const iconComponents = {
    check: <FontAwesome name="check" size={14} color="white" />,
    dollar: <Foundation name="dollar" size={16} color="white" />,
    'hand-holding-dollar': (
      <FontAwesome6 name="hand-holding-dollar" size={12} color="white" />
    ),
  };
  return (
    <>
      <View
        style={[
          styles.cardContainer,
          { width: typeof width === 'number' ? width : Number(width) },
        ]}
      >
        <Typograph style={styles.iconContainer}>
          {iconComponents[icon]}
        </Typograph>
        <Typograph style={styles.title}>{title}</Typograph>
        <Typograph fontWeight="700" style={styles.value}>
          {value}
        </Typograph>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 80,

    borderWidth: 1,
    borderColor: theme.colors.primary.border,
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 19,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 19,
    paddingLeft: 1,
    borderRadius: 100,
    backgroundColor: theme.colors.primary.quaternary,
  },
  title: {
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
});
