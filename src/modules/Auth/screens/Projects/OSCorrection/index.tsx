import React, { useEffect, useState } from 'react';
import Container from '@components/Container';
import { Alert, StyleSheet, View } from 'react-native';
import { theme } from '@theme/theme';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Button from '@components/Button';
import Spacer from '@components/Spacer';
import ImageUploader from '@components/ImageUploader';
import Typograph from '@components/Typograph';
import DownloadFile from '@components/DownloadFile';
import { useNavigation } from '@react-navigation/native';
import {
  fetchCorrectProducts,
  fetchProducts,
} from '../services/project.services';
import { Roles } from '../OSClose';

type DetailsProjectsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

export default function OSCorrection(props: any) {
  const [data, setData] = useState(props.route.params);
  const [selectedFileAntenna, setSelectedFileAntenna] = useState<string | null>(
    null
  );
  const [selectedFileInstallation, setSelectedFileInstallation] = useState<
    string | null
  >(null);
  const [selectedFileSignature, setSelectedFileSignature] = useState<
    string | null
  >(null);
  const [fileName, setFileName] = useState('documento.pdf');
  const [products, setProducts] = useState<any[]>([]);
  const [roles, setRoles] = useState<Roles>();
  const handleDelete = (type: 'antenna' | 'installation' | 'signature') => {
    Alert.alert('Deletado', 'O arquivo foi removido.');

    if (type === 'antenna') setSelectedFileAntenna(null);
    if (type === 'installation') setSelectedFileInstallation(null);
    if (type === 'signature') setSelectedFileSignature(null);
  };
  const navigation = useNavigation();

  useEffect(() => {
    const getProdutos = async () =>
      await fetchCorrectProducts({
        setLoading: () => {},
        id_project: data?.id_projeto,
        id_os: data?.id_os,
        setProducts,
        setRoles,
      });
    getProdutos();
  }, [data?.id_projeto, data?.id_os]);
  return (
    <Container scrollEnabled title={`Correção OS ${data?.id_os} `} hasGoBack>
      <View style={styles.content}>
        <Button
          variant="secondary"
          text="Ver ordem de serviço"
          style={{ height: 48 }}
          onPress={() => navigation.goBack()}
        />
        <Spacer size="extraLarge" />
        {selectedFileAntenna ? (
          <ImageUploader
            title="Foto da antena"
            fileName="imagem.jpg"
            onDeletePress={() => handleDelete('antenna')}
            iconType="image"
          />
        ) : (
          <>
            <Typograph variant="title" fontWeight="400" style={styles.title}>
              Fotos da antena
            </Typograph>
            <DownloadFile
              iconType="photo"
              label="Adicionar fotos"
              selectedImage={selectedFileAntenna}
              setSelectedImage={setSelectedFileAntenna}
            />
          </>
        )}
        <Spacer size="medium" />
        {selectedFileInstallation ? (
          <ImageUploader
            title="Foto da instalação"
            fileName="imagem.jpg"
            onDeletePress={() => handleDelete('installation')}
            iconType="image"
          />
        ) : (
          <>
            <Typograph variant="title" fontWeight="400" style={styles.title}>
              Foto da instalação
            </Typograph>
            <DownloadFile
              iconType="photo"
              label="Adicionar fotos"
              selectedImage={selectedFileInstallation}
              setSelectedImage={setSelectedFileInstallation}
            />
          </>
        )}
        <Spacer size="medium" />
        {selectedFileSignature ? (
          <ImageUploader
            title="Assinatura do cliente"
            fileName="imagem.jpg"
            onDeletePress={() => handleDelete('signature')}
            iconType="image"
          />
        ) : (
          <>
            <Typograph variant="title" fontWeight="400" style={styles.title}>
              Assinatura do cliente
            </Typograph>
            <DownloadFile
              iconType="photo"
              label="Adicionar fotos"
              selectedImage={selectedFileSignature}
              setSelectedImage={setSelectedFileSignature}
            />
          </>
        )}
        <Spacer size="extraLarge" />
        <Button
          variant="quaternary"
          text="Enviar"
          style={{ height: 48, bottom: 0 }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flex: 1,

    paddingBottom: 70,
  },

  title: {
    paddingLeft: theme.spacing.extraSmall,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 14,
  },
});
