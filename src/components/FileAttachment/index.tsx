import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../../theme/theme';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';

interface FileAttachmentProps {
  control: any;
  name: string;
}

interface Attachment {
  id: number;
  name: string;
  uri: string;
  type: 'image' | 'pdf';
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ control, name }) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setAttachments((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: `Anexo ${prev.length + 1}`,
          uri: result.assets[0].uri,
          type: 'image',
        },
      ]);
    }
  };

  const handleAddPDF = async () => {
    const result: any = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.type === 'success') {
      setAttachments((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: `Anexo ${prev.length + 1}`,
          uri: result.uri,
          type: 'pdf',
        },
      ]);
    }
  };

  const handleAddAttachment = () => {
    Alert.alert(
      'Selecionar Tipo de Anexo',
      'Escolha o tipo de anexo que deseja adicionar.',
      [
        { text: 'Imagem', onPress: handleAddImage },
        { text: 'PDF', onPress: handleAddPDF },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleRemoveAttachment = (id: number) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  };

  const renderAttachments = () => (
    <ScrollView horizontal style={styles.scrollView}>
      {attachments.map((attachment) => (
        <View key={attachment.id} style={styles.attachmentWrapper}>
          <TouchableOpacity
            style={styles.removeIconContainer}
            onPress={() => handleRemoveAttachment(attachment.id)}
          >
            <View style={styles.removeIcon}>
              <Feather name="x" size={12} color="white" />
            </View>
          </TouchableOpacity>

          <View style={styles.attachmentBox}>
            <Feather
              name="paperclip"
              size={20}
              color={theme.colors.primary.main}
            />
            <Typograph variant="caption" style={styles.attachmentText}>
              {attachment.name}
            </Typograph>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        useEffect(() => {
          field.onChange(attachments);
        }, [attachments]);

        return (
          <View>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleAddAttachment}
            >
              <Feather
                name="upload"
                size={24}
                color={theme.colors.primary.main}
              />
              <Typograph variant="caption" style={styles.uploadText}>
                Enviar anexo
              </Typograph>
            </TouchableOpacity>
            {renderAttachments()}
          </View>
        );
      }}
    />
  );
};

export default FileAttachment;

const styles = StyleSheet.create({
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.primary.main,
    padding: theme.sizes.extraSmall,
    borderRadius: 8,
    justifyContent: 'center',
  },
  uploadText: {
    marginLeft: theme.sizes.extraSmall,
    color: theme.colors.primary.main,
  },
  scrollView: {
    marginTop: theme.sizes.small,
  },
  attachmentWrapper: {
    position: 'relative',
    marginRight: theme.sizes.extraSmall,
  },
  attachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
    padding: theme.sizes.extraSmall,
    borderRadius: 8,
    minWidth: 100,
    overflow: 'hidden',
  },
  attachmentText: {
    marginLeft: theme.sizes.extraSmall,
    color: theme.colors.primary.main,
  },
  removeIconContainer: {
    position: 'absolute',
    top: -12,
    right: -12,
    zIndex: 10,
  },
  removeIcon: {
    backgroundColor: theme.colors.primary.main,
    borderRadius: 16,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
