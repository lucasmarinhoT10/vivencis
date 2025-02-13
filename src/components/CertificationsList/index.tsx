import Typograph from '@components/Typograph';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MenuOption {
  text: string; // Texto a ser exibido no menu
  onPress: () => void; // Função a ser chamada ao clicar
}
interface CertificationCardProps {
  title: string;
  subtitle?: string;
  hasError?: boolean;
  menu?: boolean;
  onPress?: () => void;
  menuOptions?: MenuOption[];
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  subtitle,
  menuOptions = [{ text: 'Excluir certificação' }],
  hasError = false,
  onPress,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.card, hasError && styles.errorCard]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.contentPrimary}>
          <View style={styles.content}>
            <Ionicons name="document-text-outline" size={20} color="#0A234C" />
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
          {/* <View>
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons
                name="ellipsis-horizontal"
                size={16}
                style={styles.menu}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </TouchableOpacity>
      {/* {isMenuVisible && (
        <View style={styles.menuContainer}>
          {menuOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuOption}
              onPress={() => {
                option.onPress();
                setMenuVisible(false);
              }}
            >
              <Typograph style={styles.menuText}>{option.text}</Typograph>
            </TouchableOpacity>
          ))}
        </View>
      )} */}
      {hasError && (
        <Text style={styles.errorText}>
          Certificação ainda não cadastrada pela empresa
        </Text>
      )}
      ;
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  contentPrimary: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.primary.graySecondary,
  },
  subtitle: {
    fontSize: 8,
    fontWeight: '400',
    color: theme.colors.primary.graySecondary,
  },
  errorCard: {
    borderColor: theme.colors.error.red,
  },
  errorText: {
    color: theme.colors.error.red,
    marginLeft: 6,
    marginTop: 6,
    fontWeight: 400,
    fontSize: 10,
  },
  menu: {
    alignSelf: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 5,
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    padding: theme.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 9999,
  },
  menuOption: {
    paddingVertical: theme.spacing.small,
  },
  menuText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
    padding: 1,
  },
});

export default CertificationCard;
