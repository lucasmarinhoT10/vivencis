import React from 'react';
import {
  Feather,
  MaterialIcons,
  FontAwesome,
  Octicons,
  AntDesign,
  Entypo,
} from '@expo/vector-icons';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '@theme/theme';
import { getColor } from '@utils/getColor';

interface OrderButtonProps {
  text: string;
  onPress: () => void;
  iconName: string;
  iconLibrary?:
    | 'Feather'
    | 'MaterialIcons'
    | 'FontAwesome'
    | 'Octicons'
    | 'AntDesign'
    | 'Entypo';
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  color?: keyof typeof theme.colors | string;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  text,
  onPress,
  iconName,
  iconLibrary = 'Feather',
  size = 'medium',
  color = 'primary',
}) => {
  const iconSize = theme.sizes[size];
  const iconColor = getColor(color);

  const IconComponent = {
    Feather,
    MaterialIcons,
    FontAwesome,
    Octicons,
    AntDesign,
    Entypo,
  }[iconLibrary];

  if (!IconComponent) {
    console.warn(`A biblioteca de ícones "${iconLibrary}" não é suportada.`);
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{text}</Text>
      <IconComponent name={iconName as any} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.bgOrderButton,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,

    shadowColor: '#000',
    justifyContent: 'space-between',
    width: 117,
    marginTop: 16,
    marginBottom: 16,
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginRight: 10,
  },
});

export default OrderButton;
