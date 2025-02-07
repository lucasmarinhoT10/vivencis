import { View, StyleSheet } from 'react-native';
import React from 'react';
import Line from '@components/Line';
import Spacer from '@components/Spacer';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';

const StepFour = () => {
  return (
    <View style={styles.content}>
      <Typograph
        variant="title"
        textAlign="center"
        fontWeight="500"
        style={styles.title}
      >
        3. Tire fotos de qualidade
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
            Garanta que a área esteja bem iluminada e livre de obstruções de
            fundo.
          </Typograph>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            •
          </Typograph>

          <Typograph variant="body" textAlign="left" fontWeight="400">
            Capture imagens claras e focadas, centralizando o produto ou a área
            de inspeção no quadro.
          </Typograph>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            •
          </Typograph>

          <Typograph variant="body" textAlign="left" fontWeight="400">
            Se o formulário exigir vários ângulos, organize a sequência de fotos
            para torná-la clara e lógica.
          </Typograph>
        </View>
      </View>
    </View>
  );
};

export default StepFour;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    marginTop: 80,
  },
  title: {
    paddingLeft: theme.spacing.extraSmall,
    fontSize: 22,
    color: theme.colors.primary?.quaternary,
  },
});
