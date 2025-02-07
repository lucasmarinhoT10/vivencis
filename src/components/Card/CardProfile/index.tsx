import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Card from '@components/Card';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import { stylesGlobal } from '@theme/stylesGlobal';
import Spacer from '@components/Spacer';

interface CardProfileProps {
  title: string;
  imageUrl: string;
  label?: string;
}

const CardProfile: React.FC<CardProfileProps> = ({
  title,
  imageUrl,
  label,
}) => {
  return (
    <Card
      style={styles.card}
      horizontal
      elevated
      spacerHorizontal="medium"
      spacerVertical="medium"
    >
      <Image source={{ uri: imageUrl }} style={stylesGlobal.image48} />
      <View style={styles.textContainer}>
        {label && (
          <Typograph variant="caption" color="text.secondary">
            {label}
          </Typograph>
        )}
        <Spacer size="small" />
        <Typograph variant="title" fontWeight="600">
          {title}
        </Typograph>
      </View>
    </Card>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginLeft: theme.spacing.medium,
  },
});
