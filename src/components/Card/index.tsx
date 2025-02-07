import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

interface CardProps {
  children: React.ReactNode;
  spacerHorizontal?: 'small' | 'medium' | 'large';
  spacerVertical?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  horizontal?: boolean;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  spacerHorizontal = 'small',
  spacerVertical = 'small',
  horizontal = false,
  style,
  elevated = false,
}) => {
  const cardStyle: ViewStyle = {
    paddingHorizontal: spacerHorizontal ? theme.spacing[spacerHorizontal] : 0,
    paddingVertical: spacerVertical ? theme.spacing[spacerVertical] : 0,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    elevation: elevated ? 4 : 1,
    flexDirection: horizontal ? 'row' : 'column',
    alignItems: horizontal ? 'center' : 'flex-start',
    width: '100%',
    shadowColor: elevated ? '#000' : undefined,
    shadowOffset: elevated ? { width: 0, height: 2 } : undefined,
    shadowOpacity: elevated ? 0.1 : undefined,
    shadowRadius: elevated ? 4 : undefined,
  };

  return <View style={[cardStyle, style]}>{children}</View>;
};

export default Card;
