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
import * as FileSystem from 'expo-file-system';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../../theme/theme';

interface DownloadFileProps {
  label: string;
  onlyCam?: boolean;
  iconType: 'photo' | 'file';
  selectedImage: string | null;
  setSelectedImage: (imageUri: string) => void;
}

const MAX_FILE_SIZE_MB = 2; // 2MB

const DownloadFile: React.FC<DownloadFileProps> = ({
  label,
  iconType,
  selectedImage,
  setSelectedImage,
  onlyCam,
}) => {
  const handleResult = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists && fileInfo.size) {
        const fileSizeMB = fileInfo.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          Alert.alert(
            'Arquivo muito grande',
            `O arquivo selecionado tem ${fileSizeMB.toFixed(
              2
            )}MB. O tamanho máximo permitido é ${MAX_FILE_SIZE_MB}MB.`
          );
          return;
        }
        setSelectedImage(uri);
      }
    }
  };

  const openCamera = async () => {
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
    handleResult(result);
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    handleResult(result);
  };

  const handlePickImage = async () => {
    if (onlyCam) {
      openCamera();
    } else {
      Alert.alert('Selecione a opção', 'Deseja abrir a câmera ou a galeria?', [
        {
          text: 'Câmera',
          onPress: openCamera,
        },
        {
          text: 'Galeria',
          onPress: openGallery,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]);
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
