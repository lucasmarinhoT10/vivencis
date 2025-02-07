import { Entypo } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export const ExpandableCard = ({ title, children }: any) => {
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
            color="#FFF"
          />
        </TouchableOpacity>

        {isOpen && <View style={styles.body}>{children}</View>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    backgroundColor: theme.colors.primary.quaternary,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    padding: 12,
  },
});
