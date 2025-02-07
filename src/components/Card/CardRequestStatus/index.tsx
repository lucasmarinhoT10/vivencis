import React from 'react';
import { StyleSheet, View } from 'react-native';
import Card from '@components/Card';
import Typograph from '@components/Typograph';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { theme } from '@theme/theme';

interface CardRequestStatusProps {
  title: string;
  status: 'result' | 'sent' | 'received';
  onPress: () => void;
}

const CardRequestStatus: React.FC<CardRequestStatusProps> = ({
  title,
  status,
  onPress,
}) => {
  const getButtonProps = (): {
    icon: JSX.Element | null;
    text: string;
    variant: 'primary' | 'secondary' | 'tertiary' | 'secondary-warning';
  } => {
    switch (status) {
      case 'result':
        return {
          icon: <Icon name="download" color={theme.colors.text.onPrimary} />,
          text: 'Resultado',
          variant: 'primary',
        };
      case 'sent':
        return {
          icon: <Icon name="upload" color={theme.colors.warning} />,
          text: 'Enviado',
          variant: 'secondary-warning',
        };
      case 'received':
        return {
          icon: <Icon name="check-square" color={theme.colors.primary.main} />,
          text: 'Recebido',
          variant: 'secondary',
        };
      default:
        return {
          icon: null,
          text: 'Action',
          variant: 'primary',
        };
    }
  };

  const getBorderColor = (): string => {
    switch (status) {
      case 'sent':
        return theme.colors.warning;
      default:
        return theme.colors.primary.main;
    }
  };

  const { icon, text, variant } = getButtonProps();

  return (
    <Card
      style={[styles.card, { borderBottomColor: getBorderColor() }]}
      horizontal
      elevated
      spacerHorizontal="medium"
      spacerVertical="medium"
    >
      <View style={styles.titleContainer}>
        <Typograph variant="title" fontWeight="500">
          {title}
        </Typograph>
      </View>
      <Button
        onPress={onPress}
        variant={variant}
        left={() => icon}
        text={text}
        halfWidth
        fontWeight="600"
        textAlign="left"
      />
    </Card>
  );
};

export default CardRequestStatus;

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    marginRight: theme.spacing.medium,
  },
});
