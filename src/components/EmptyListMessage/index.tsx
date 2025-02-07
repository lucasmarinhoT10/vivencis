import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { stylesGlobal } from '@theme/stylesGlobal';

type VariantType = 'title' | 'semiTitle' | 'body' | 'caption' | 'options';

interface EmptyListMessageProps {
  title: string;
  subtitle: string;
  titleVariant?: VariantType;
  subtitleVariant?: VariantType;
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({
  title,
  subtitle,
  titleVariant = 'title',
  subtitleVariant = 'semiTitle',
}) => {
  return (
    <View style={styles.emptyContainer}>
      <Typograph variant={titleVariant} style={styles.emptyTitle}>
        {title}
      </Typograph>
      <Typograph variant={subtitleVariant} style={styles.emptySubtitle}>
        {subtitle}
      </Typograph>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    ...stylesGlobal.flex1,
  },
  emptyTitle: {
    marginTop: theme.spacing.extraSmall,
    marginBottom: theme.spacing.medium,
    color: theme.colors.text.title,
  },
  emptySubtitle: {
    marginTop: theme.spacing.extraSmall,
    color: theme.colors.text.secondary,
  },
});

export default EmptyListMessage;
