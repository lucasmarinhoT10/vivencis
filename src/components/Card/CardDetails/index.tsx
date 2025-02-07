import React from 'react';
import { StyleSheet, View } from 'react-native';
import Card from '@components/Card';
import Typograph from '@components/Typograph';
import Icon from '@components/Icon';
import { theme } from '@theme/theme';
import CardRequestStatus from '../CardRequestStatus';
import Spacer from '@components/Spacer';

interface CardDetailsRequestProps {
  title: string;
  status: 'result' | 'sent' | 'received';
  onPress: () => void;
  requestedAt: string;
  linksCount: number;
}

const CardDetailsRequest: React.FC<CardDetailsRequestProps> = ({
  title,
  status,
  onPress,
  requestedAt,
  linksCount,
}) => {
  return (
    <Card elevated spacerHorizontal="medium" spacerVertical="medium">
      <CardRequestStatus title={title} status={status} onPress={onPress} />
      <Spacer size="medium" />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon
            name="calendar"
            size="small"
            color={theme.colors.text.secondary}
            marginRight={8}
          />
          <Typograph variant="body" color="text.secondary">
            Solicitado em {requestedAt}
          </Typograph>
        </View>
        <Spacer size="small" />
        <View style={styles.detailRow}>
          <Icon
            name="info"
            size="small"
            color={theme.colors.text.secondary}
            marginRight={8}
          />
          <Typograph variant="body" color="text.secondary">
            Quant. de vínculos: {linksCount}
          </Typograph>
        </View>
      </View>
    </Card>
  );
};

export default CardDetailsRequest;

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: theme.spacing.small,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.extraSmall,
  },
});
