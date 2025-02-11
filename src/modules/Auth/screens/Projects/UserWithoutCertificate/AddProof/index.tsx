import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { StyleSheet } from 'react-native';

import { theme } from '@theme/theme';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Button from '@components/Button';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import ImageUploader from '@components/ImageUploader';
import DownloadFile from '@components/DownloadFile';

type AddProofScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function AddProofScreen(props: any) {
  const [imageUri, setImageUri] = useState<string | null>();
  const [imageUriId, setImageUriId] = useState<string | null>();
  const [imageUriQualifications, setImageUriQualifications] = useState<
    string | null
  >();
  const [imageUriQualificationsError, setImageUriQualificationsError] =
    useState<string | null>();

  const handleImageSelect = (uri: string, type: any) => {
    if (type === 'responsibleId') {
      setImageUriId(uri);
    } else {
      setImageUri(uri);
    }
  };
  return (
    <Container
      scrollEnabled
      title={'Comprovante de pré-requisito'}
      hasGoBack
      spacerVertical="small"
    >
      <Spacer size="medium" />
      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Formulário de cadastro de certificação
      </Typograph>
      <Spacer size="medium" />
      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Nome do arquivo
      </Typograph>
      <Spacer size="small" />
      <Input name="name" placeholder="Descreva a qualificação" />
      <Spacer size="small" />
      <Typograph variant="title" fontWeight="500" style={styles.title}>
        Upload de arquivo/foto
      </Typograph>
      <Spacer size="small" />
      <DownloadFile
        iconType="file"
        setSelectedImage={(uri) => handleImageSelect(uri, 'cnpj')}
        selectedImage={imageUri}
        label="Anexar arquivo"
      />
      <Spacer size="extraLarge" />
      <Button
        style={{ height: 48, marginBottom: 52 }}
        variant="quinary"
        text="Enviar comprovante"
        fontWeight="600"
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 16,
  },
});
