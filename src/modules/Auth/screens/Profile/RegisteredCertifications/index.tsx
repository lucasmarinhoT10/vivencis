import React, { useCallback, useEffect, useState } from 'react';
import Container from '@components/Container';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { theme } from '@theme/theme';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Button from '@components/Button';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import Input from '@components/Input';
import ImageUploader from '@components/ImageUploader';
import DownloadFile from '@components/DownloadFile';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DynamicModal from '@components/DynamicModal';
import { ModalConfirmation } from '@components/Modal';
import CertificationCard from '@components/CertificationsList';
import useRegisterStore from 'src/store/useRegisterStore';
import { getRegistro } from '../../SignIn/services/login.services';
import useUserStore from 'src/store/userStore';
import ImageViewing from 'react-native-image-viewing';
import { getDocumentosTipo } from '../../Register/services/register.services';

type RegisteredCertificationsScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;

const certifications = [
  { id: 1, title: 'Certificação React Native', hasError: false },
  { id: 2, title: 'Certificação Node.js', hasError: true },
  { id: 3, title: 'Certificação TypeScript', hasError: false },
];

export default function RegisteredCertificationsScreen(props: any) {
  const { register, setRegister } = useRegisterStore();
  const { user } = useUserStore();
  const [docsTipo, setDocsTipo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [imageViewingSource, setImageViewingSource] = useState<
    { uri: string }[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useFocusEffect(
    useCallback(() => {
      getRegisterData();
      getDocsTipoData();
    }, [])
  );
  const getDocsTipoData = async () => {
    await getDocumentosTipo({ setLoading: () => {}, setDocsTipo });
  };
  const getRegisterData = async () => {
    setLoading(true);
    const data = await getRegistro({ id_parceiro: user?.id_entidade });
    if (data) {
      setRegister(data);
    }
    setLoading(false);
  };

  return (
    <Container title="Certificações" hasGoBack>
      <ImageViewing
        images={imageViewingSource}
        imageIndex={currentImageIndex}
        visible={isImageViewerVisible}
        onRequestClose={() => setIsImageViewerVisible(false)}
      />
      ;
      {loading ? (
        <ActivityIndicator size={'large'} style={{ marginTop: 80 }} />
      ) : (
        <>
          {register?.documentos_qualificacoes?.length <= 0 ? (
            <>
              <Typograph textAlign="center" style={{ marginTop: 80 }}>
                Nenhum certificado cadastrado
              </Typograph>
            </>
          ) : (
            <>
              <Spacer size="medium" />
              <Typograph variant="title" fontWeight="500" style={styles.title}>
                Certificações cadastradas
              </Typograph>
              <Spacer size="medium" />

              {register?.documentos_qualificacoes.map(
                (cert: any, index: any) => (
                  <View key={index}>
                    <CertificationCard
                      title={
                        docsTipo?.find(
                          (it) => it?.cod_tipo === cert?.tipo_documento
                        ).descricao
                      }
                      subtitle={`Validade em ${cert?.validade}`}
                      onPress={() => {
                        setImageViewingSource([
                          {
                            uri: `data:image/jpeg;base64,${cert.base64}`,
                          },
                        ]);
                        setCurrentImageIndex(0);
                        setIsImageViewerVisible(true);
                      }}
                    />
                    <Spacer size="medium" />
                  </View>
                )
              )}
            </>
          )}
        </>
      )}
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
