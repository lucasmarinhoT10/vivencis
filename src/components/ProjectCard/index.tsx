import { theme } from '@theme/theme';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ProjectCardProps {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  onPress?: () => void;
  place?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  startDate,
  endDate,
  description,
  onPress,
  place,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.label}>Data de execução</Text>
        <Text style={styles.executionDate}>
          {startDate} a {endDate}
        </Text>
        <Text style={styles.description}>{description}</Text>
        {place && <Text style={styles.label}>{place}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21,
    color: theme.colors.primary.title,
    marginBottom: 8,
  },
  label: {
    fontSize: 9,
    fontWeight: '500',
    color: theme.colors.primary.placeholder,
    marginBottom: 4,
  },
  executionDate: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.colors.text.description,
    marginBottom: 8,
  },
  description: {
    fontSize: 9,
    fontWeight: '400',
    color: theme.colors.primary.placeholder,
    lineHeight: 14,
  },
});

export default ProjectCard;
