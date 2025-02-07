import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

interface ImageUploaderProps {
  title?: string;
  fileName: string;
  onDeletePress: () => void;
  onPress?: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  fileName,
  onDeletePress,
  onPress,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.fileRow}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={theme.colors.primary.title}
            />
            <Text style={styles.fileName}>{fileName}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons
          name="ellipsis-horizontal"
          size={18}
          style={styles.menu}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>

      {/* Menu */}
      {isMenuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              onDeletePress();
              setMenuVisible(false);
            }}
          >
            <Text style={styles.menuText}>Excluir qualificação</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              console.log('Ação 2 selecionada');
              setMenuVisible(false);
            }}
          >
            <Text style={styles.menuText}>Ação 2</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 84,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    padding: theme.spacing.large,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative', // Importante para posicionar o menu relativo ao cartão
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.small,
  },
  title: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    color: theme.colors.text.description,
    marginBottom: theme.spacing.extraSmall,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.extraSmall,
  },
  fileName: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.tertiary,
    marginLeft: theme.spacing.extraSmall,
  },
  menu: {
    marginBottom: 20,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 70, // Ajuste para exibir acima do botão (distância relativa à altura do menu)
    right: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: theme.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 9999, // Garante que fique acima de outros elementos
  },
  menuOption: {
    paddingVertical: theme.spacing.small,
  },
  menuText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
  },
});

export default ImageUploader;
