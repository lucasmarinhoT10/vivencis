import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
interface ResultProps {
  control?: any;
  title: string;
  type: string;
  location?: string;
  selected?: boolean;
  address?: string;
  handleSelect: () => void;
}

const Result: React.FC<ResultProps> = ({
  title,
  type,
  selected,
  location,
  address,
  handleSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={handleSelect}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View>
        <Typograph variant="body" style={styles.title}>
          {title}
        </Typograph>
        <Spacer size="extraSmall" />
        <Typograph style={styles.type}>{type}</Typograph>
        <Spacer size="small" />
        <Typograph style={styles.address}>{address}</Typograph>
        <Spacer size="extraSmall" />
        <Typograph style={styles.location}>{location}</Typograph>
      </View>
      <View style={styles.select}>
        <View style={selected ? styles.select : styles.unseleted}>
          {selected && (
            <AntDesign name="check" color={theme.colors.text.onPrimary} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing.medium,
    elevation: 1,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,

    backgroundColor: theme.colors.surface,
    borderRadius: 8,
  },
  select: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.tertiary.main,
    borderColor: theme.colors.tertiary.main,
  },
  unseleted: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.text.secondary,
    backgroundColor: theme.colors.text.onPrimary,
  },
  title: {
    color: theme.colors.tertiary.main,
    textTransform: 'uppercase',
  },
  type: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.lineHeight,
    textTransform: 'uppercase',
  },
  address: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.lineHeight,
    textTransform: 'uppercase',
  },
  location: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.lineHeight,
  },
});

export default Result;
