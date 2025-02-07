import React from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

interface SpacerProps {
  size?:
    | 'extraSmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'extraLarge'
    | 'doubleMedium';
  direction?: 'top' | 'bottom' | 'horizontal';
  children?: React.ReactNode;
}

const Spacer: React.FC<SpacerProps> = ({
  size = 'small',
  direction = 'top',
  children,
}) => {
  const getSizeStyle = (): ViewStyle => {
    const marginValue = theme.spacing[size];

    switch (direction) {
      case 'top':
        return { marginTop: marginValue };
      case 'bottom':
        return { marginBottom: marginValue };
      case 'horizontal':
        return { marginLeft: marginValue, marginRight: marginValue };
      default:
        return {};
    }
  };

  return <View style={getSizeStyle()}>{children}</View>;
};

export default Spacer;
