import Typograph from '@components/Typograph';
import { Entypo } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const PaginationControls = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === 1 && styles.disabledButton,
        ]}
        onPress={onPrev}
        disabled={currentPage === 1}
      >
        <Entypo
          size={20}
          name="chevron-thin-left"
          color={theme.colors.primary.labelValue}
        />
      </TouchableOpacity>
      <Typograph style={styles.pageIndicator}>
        {currentPage} de {totalPages}
      </Typograph>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={onNext}
        disabled={currentPage === totalPages}
      >
        <Entypo
          size={20}
          name="chevron-thin-right"
          color={theme.colors.primary.labelValue}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: theme.spacing.extraSmall,
    paddingVertical: theme.spacing.doubleMedium,
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    width: '100%',
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 16,
  },
  orderButton: {
    flexDirection: 'row',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: theme.spacing.small,
    justifyContent: 'space-around',
  },
  customButtonText: {
    color: theme.colors.secondary.contrastText,
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButton: {
    backgroundColor: theme.colors.primary.gray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: theme.colors.primary.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButtonText: {
    color: theme.colors.primary.labelValue,
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: theme.colors.primary.border,
    opacity: 0.5,
  },
  pageIndicator: {
    fontSize: 16,
  },
});
