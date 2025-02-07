import { UsersIcon } from '../../assets/svgs';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import { theme } from '../../theme/theme'; // Assumindo que você já tenha um tema configurado

interface IconSvgProps extends SvgProps {
  name: 'users' | 'back';
  color?: string;
}

const IconSvg: React.FC<IconSvgProps> = ({
  name,
  color = 'black',
  ...rest
}) => {
  const getColor = (color: string): string => {
    switch (color) {
      case 'primary.main':
        return theme.colors.primary.main;
      case 'text.primary':
        return theme.colors.text.primary;
      case 'text.secondary':
        return theme.colors.text.secondary;
      default:
        return color;
    }
  };

  const renderIcon = () => {
    const resolvedColor = getColor(color);

    switch (name) {
      case 'users':
        return <UsersIcon color={resolvedColor} {...rest} />;
      default:
        return null;
    }
  };

  return renderIcon();
};

export default IconSvg;
