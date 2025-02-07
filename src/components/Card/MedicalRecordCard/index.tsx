import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '@components/Card';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import Spacer from '@components/Spacer';
import Icon from '@components/Icon';
import CardProfile from '../CardProfile';
import { stylesGlobal } from '@theme/stylesGlobal';

interface MedicalRecordCardProps {
  title: string;
  imageUrl: string;
  appointmentDate: string;
  appointmentTime: string;
  registrationDate: string;
  description?: string;
  variant: 'small' | 'complete';
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({
  title,
  imageUrl,
  appointmentDate,
  appointmentTime,
  registrationDate,
  description,
  variant,
}) => {
  const getShortDescription = () => {
    if (description && description.length > 100) {
      return `${description.substring(0, 100)}...`;
    }
    return description;
  };

  return (
    <Card
      elevated
      spacerHorizontal="medium"
      spacerVertical="medium"
      style={styles.cardContainer}
    >
      <CardProfile imageUrl={imageUrl} title={title} label="Registrado por:" />

      <Spacer size="medium" />

      {variant === 'small' && description && (
        <>
          <Typograph variant="caption">Descrição:</Typograph>
          <Spacer size="small" />
          <Typograph variant="body" color="text.secondary">
            {getShortDescription()}
          </Typograph>
          <Spacer size="small" />
        </>
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.detailColumn}>
          <Typograph variant="caption">Data da consulta:</Typograph>
          <Spacer size="small" />
          <View style={styles.detailRow}>
            <Icon
              name="calendar"
              color={theme.colors.text.secondary}
              marginRight={theme.sizes.extraExtraSmall}
            />
            <Spacer size="small" />
            <Typograph
              variant="body"
              fontWeight="500"
              color={theme.colors.text.secondary}
            >
              {appointmentDate}
            </Typograph>
          </View>
        </View>

        <Spacer size="small" />

        <View style={styles.detailColumn}>
          <Typograph variant="caption">Horário da consulta:</Typograph>
          <Spacer size="small" />
          <View style={styles.detailRow}>
            <Icon
              name="clock"
              color={theme.colors.text.secondary}
              marginRight={theme.sizes.extraExtraSmall}
            />
            <Spacer size="small" />
            <Typograph
              variant="body"
              fontWeight="500"
              color={theme.colors.text.secondary}
            >
              {appointmentTime}
            </Typograph>
          </View>
        </View>

        <Spacer size="small" />

        <View
          style={[
            styles.detailColumn,
            variant !== 'complete' && stylesGlobal.marginBottomZero,
          ]}
        >
          <Typograph variant="caption">Data de registro:</Typograph>
          <Spacer size="small" />
          <View style={styles.detailRow}>
            <Icon
              name="calendar"
              color={theme.colors.text.secondary}
              marginRight={theme.sizes.extraExtraSmall}
            />
            <Spacer size="small" />
            <Typograph
              variant="body"
              fontWeight="500"
              color={theme.colors.text.secondary}
            >
              {registrationDate}
            </Typograph>
          </View>
        </View>
      </View>

      {variant === 'complete' && description && (
        <>
          <Spacer size="small" />
          <Typograph variant="caption">Descrição:</Typograph>
          <Spacer size="small" />
          <Typograph variant="body" color="text.secondary">
            {description}
          </Typograph>
        </>
      )}
    </Card>
  );
};

export default MedicalRecordCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: theme.colors.primary.main,
    borderWidth: 1,
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: theme.spacing.small,
  },
  detailColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.medium,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
