import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../../theme/theme';

interface DownloadFileProps {
  label: string;
  onlyCam?: boolean;
  iconType: 'photo' | 'file';
  selectedImage: any;
  setSelectedImage: (imageUri: string) => void;
}

const DownloadFile: React.FC<DownloadFileProps> = ({
  label,
  iconType,
  selectedImage,
  setSelectedImage,
  onlyCam,
}) => {
  const handlePickImage = async () => {
    if (onlyCam) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso à câmera para continuar.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso à galeria para continuar.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handlePickImage} style={styles.button}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {iconType === 'photo' ? (
              <MaterialIcons
                name="add-photo-alternate"
                size={24}
                color={theme.colors.primary.placeholder}
              />
            ) : (
              <Ionicons
                name="document-attach-outline"
                size={24}
                color={theme.colors.primary.placeholder}
              />
            )}
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderWidth: 1,
    height: 91,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: theme.spacing.extraSmall,
  },
  label: {
    color: theme.colors.primary.placeholder,
    fontSize: theme.typography.body.fontSize,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default DownloadFile;
