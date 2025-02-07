import { Entypo } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export const ExpandableCardPhotos = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <View style={[styles.cardContainer]}>
        <TouchableOpacity
          style={[styles.header, !isOpen && { borderRadius: 8 }]}
          onPress={toggleOpen}
        >
          <Text style={styles.headerText}>{title}</Text>
          <Entypo
            name={isOpen ? 'chevron-small-up' : 'chevron-small-down'}
            size={22}
            color="#000"
          />
        </TouchableOpacity>

        {isOpen && <View style={styles.body}>{children}</View>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    gap: 20,
  },
  headerText: {
    color: theme.colors.primary.title,
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '85%',
  },
  body: {
    padding: 12,
  },
});
