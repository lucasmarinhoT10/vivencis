import { Entypo, Ionicons } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CertificationCardProps {
  title: string;
  hasError?: boolean;
  onPress?: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  hasError = false,
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.card, hasError && styles.errorCard]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <Ionicons name="document-text-outline" size={20} color="#0A234C" />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      {hasError && (
        <Text style={styles.errorText}>
          Certificação ainda não cadastrada pela empresa
        </Text>
      )}
      ;
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    paddingHorizontal: 22,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.primary.graySecondary,
  },
  errorCard: {
    borderColor: theme.colors.error.red,
  },
  errorText: {
    color: theme.colors.error.red,
    marginLeft: 6,
    marginTop: 6,
    fontWeight: 400,
    fontSize: 10,
  },
});

export default CertificationCard;
