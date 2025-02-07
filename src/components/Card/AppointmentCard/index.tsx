import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Card from '@components/Card';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';
import { stylesGlobal } from '@theme/stylesGlobal';
import Spacer from '@components/Spacer';
import Icon from '@components/Icon';
import Chip from '@components/Chip';

interface AppointmentCardProps {
  title: string;
  imageUrl: string;
  status: 'scheduled' | 'attended' | 'canceled' | 'inProgress';
  appointmentDate: string;
  appointmentTime: string;
  description?: string; // Adicionando a descrição para a variante completa
  variant: 'small' | 'complete';
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  title,
  imageUrl,
  status,
  appointmentDate,
  appointmentTime,
  description,
  variant = 'small',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'scheduled':
        return theme.colors.primary.main;
      case 'attended':
        return theme.colors.success;
      case 'canceled':
        return theme.colors.error;
      case 'inProgress':
        return theme.colors.warning;
      default:
        return theme.colors.primary.main;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'scheduled':
        return 'Agendada';
      case 'attended':
        return 'Atendido';
      case 'canceled':
        return 'Cancelado';
      case 'inProgress':
        return 'Realizando';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card elevated spacerHorizontal="medium" spacerVertical="medium">
      <Card
        horizontal
        elevated
        spacerHorizontal="medium"
        spacerVertical="medium"
        style={styles.innerCard}
      >
        <Image source={{ uri: imageUrl }} style={stylesGlobal.image48} />
        <View style={styles.textContainer}>
          <Typograph variant="title" fontWeight="600">
            {title}
          </Typograph>
          <Chip
            text={getStatusText()}
            color={getStatusColor()}
            style={styles.chip}
          />
        </View>
      </Card>

      <Spacer size="medium" />

      <View
        style={[
          styles.detailsContainer,
          variant === 'complete' && { flexDirection: 'column' },
        ]}
      >
        <View style={styles.detailColumn}>
          <Typograph variant="caption">Data da consulta:</Typograph>
          <Spacer size="small" />
          <View style={styles.detailRow}>
            <Icon
              name="calendar"
              color={theme.colors.text.secondary}
              marginRight={8}
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

        {variant === 'complete' && <Spacer size="medium" />}
        <View style={styles.detailColumn}>
          <Typograph variant="caption">Horário da consulta:</Typograph>
          <Spacer size="small" />
          <View style={styles.detailRow}>
            <Icon
              name="clock"
              color={theme.colors.text.secondary}
              marginRight={8}
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
      </View>

      {variant === 'complete' && description && (
        <>
          <Spacer size="small" />
          <View style={styles.descriptionContainer}>
            <Typograph variant="caption">Descrição:</Typograph>
            <Spacer size="small" />
            <Typograph variant="body" color="text.secondary">
              {description}
            </Typograph>
          </View>
        </>
      )}
    </Card>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  innerCard: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginLeft: theme.spacing.medium,
  },
  chip: {
    marginTop: theme.spacing.small,
  },
  detailsContainer: {
    marginTop: theme.spacing.small,
    flexDirection: 'row', // Inicialmente na horizontal
    justifyContent: 'space-between',
  },
  detailColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: theme.spacing.small,
  },
});
