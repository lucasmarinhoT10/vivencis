import React from 'react';
import {
  Feather,
  MaterialIcons,
  FontAwesome,
  Octicons,
  AntDesign,
  Entypo,
} from '@expo/vector-icons'; // Importando várias bibliotecas
import { theme } from '@theme/theme';
import { getColor } from '@utils/getColor';

interface IconProps {
  name: string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  color?: keyof typeof theme.colors | string;
  iconLibrary?:
    | 'Feather'
    | 'MaterialIcons'
    | 'FontAwesome'
    | 'Octicons'
    | 'AntDesign';
  marginRight?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color = 'primary',
  iconLibrary = 'Feather',
  marginRight = 0,
}) => {
  const iconSize = theme.sizes[size];
  const iconColor = getColor(color);

  const IconComponent = {
    Feather,
    MaterialIcons,
    FontAwesome,
    Octicons,
    AntDesign,
  }[iconLibrary];

  return (
    <IconComponent
      name={name as any}
      size={iconSize}
      color={iconColor}
      style={{ marginRight }}
    />
  );
};

export default Icon;
