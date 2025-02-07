import { View, StyleSheet } from 'react-native';
import React from 'react';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';

const StepTwo = () => {
  return (
    <View style={styles.content}>
      <Typograph
        variant="title"
        textAlign="center"
        fontWeight="600"
        style={styles.title}
      >
        1. Leia atentamente o formulário antes de começar
      </Typograph>
      <View
        style={{
          width: '100%',
          height: 200,
          backgroundColor: '#eee',
          marginVertical: 20,
        }}
      ></View>
      <View style={{ paddingHorizontal: 16, marginTop: 'auto', gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            •
          </Typograph>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            Analise cada campo do formulário para entender o que está sendo
            solicitado.
          </Typograph>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            •
          </Typograph>

          <Typograph variant="body" textAlign="left" fontWeight="400">
            Verifique instruções específicas, como formatos necessários (datas,
            medidas, etc.).
          </Typograph>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            •
          </Typograph>

          <Typograph variant="body" textAlign="left" fontWeight="400">
            Certifique-se de ter todas as informações e ferramentas necessárias
            (por exemplo, um smartphone ou câmera) prontas para capturar fotos
            ou vídeos.
          </Typograph>
        </View>
      </View>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    marginTop: 70,
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    fontSize: 22,
    color: theme.colors.primary?.quaternary,
  },
});
