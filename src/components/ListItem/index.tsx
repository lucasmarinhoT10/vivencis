import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { theme } from '../../theme/theme';
import Typograph from '../Typograph';
import Card from '../Card';

interface ListItemProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  left?: () => React.ReactNode;
  right?: () => React.ReactNode;
  onPress?: () => void;
  isSignin?: 'border' | 'background';
  spacerHorizontal?: 'small' | 'medium' | 'large';
  spacerVertical?: 'small' | 'medium' | 'large';
  elevated?: boolean;
  titleColor?: string;
  subtitleColor?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  left,
  right,
  onPress,
  spacerHorizontal = 'medium',
  spacerVertical = 'medium',
  isSignin,
  elevated = false,
  titleColor,
  subtitleColor,
}) => {
  const background =
    isSignin === 'background' ? styles.cardContainerWithBackgroud : {};
  const border = isSignin === 'border' ? styles.cardContainerWithBorder : {};
  const elevationStyle = elevated ? styles.elevated : {};

  const defaultTitleColor =
    isSignin === 'background'
      ? theme.colors.text.onPrimary
      : theme.colors.text.description;
  const defaultSubtitleColor = theme.colors.text.description;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={!onPress ? 1 : 0.7}>
      <Card
        spacerHorizontal={spacerHorizontal}
        spacerVertical={spacerVertical}
        horizontal
        style={{
          ...styles.cardContainer,
          ...border,
          ...background,
          ...elevationStyle,
        }}
      >
        <View style={styles.row}>
          {left && <View style={styles.iconLeft}>{left()}</View>}
          <View style={styles.content}>
            {typeof title === 'string' ? (
              <Typograph
                variant={'body'}
                color={titleColor || defaultTitleColor}
                fontWeight={'400'}
              >
                {title}
              </Typograph>
            ) : (
              title
            )}
            {subtitle &&
              (typeof subtitle === 'string' ? (
                <Typograph
                  variant={'caption'}
                  color={subtitleColor || defaultSubtitleColor}
                >
                  {subtitle}
                </Typograph>
              ) : (
                <View style={styles.subtitleContainer}>{subtitle}</View>
              ))}
          </View>
          {right && <View style={styles.iconRight}>{right()}</View>}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
  },
  cardContainerWithBorder: {
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
    height: 48,
  },
  cardContainerWithBackgroud: {
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'space-between',
    borderRadius: 8,
    height: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconLeft: {
    marginRight: theme.spacing.medium,
  },
  subtitleContainer: {
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  iconRight: {
    marginLeft: theme.spacing.small,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default ListItem;
