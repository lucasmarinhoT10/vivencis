import React from 'react';
import { View, StyleSheet } from 'react-native';

import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';

const StepThree = () => {
  return (
    <View style={styles.content}>
      <Typograph
        variant="title"
        textAlign="center"
        fontWeight="600"
        style={styles.title}
      >
        2. Preencha os campos de texto de forma clara e precisa
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
            Use uma linguagem coesa, evitando abreviações ou gírias.
          </Typograph>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            •
          </Typograph>

          <Typograph variant="body" textAlign="left" fontWeight="400">
            Revise as informações inseridas antes de prosseguir, corrigindo
            quaisquer erros potenciais.
          </Typograph>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Typograph variant="body" textAlign="left" fontWeight="400">
            •
          </Typograph>

          <Typograph variant="body" textAlign="left" fontWeight="400">
            Em caso de dúvida, consulte um supervisor ou a pessoa responsável
            pelo serviço para evitar erros.
          </Typograph>
        </View>
      </View>
    </View>
  );
};

export default StepThree;

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
