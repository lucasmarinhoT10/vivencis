import { View, StyleSheet } from 'react-native';
import React from 'react';

import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';

const StepOne = () => {
  return (
    <>
      <View style={styles.content}>
        <Typograph
          variant="title"
          textAlign="center"
          fontWeight="600"
          style={styles.title}
        >
          Manual de preenchimento
        </Typograph>
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: '#eee',
            marginVertical: 20,
          }}
        ></View>
        <View style={{ paddingHorizontal: 16, marginTop: 'auto' }}>
          <Typograph variant="body" textAlign="center" fontWeight="400">
            Este guia ajudará você a preencher seu formulário de forma simples e
            correta, evitando retrabalho e acelerando o processo. Nas páginas
            seguintes, você encontrará dicas para preencher o formulário —
            aproveite!
          </Typograph>
        </View>
      </View>
    </>
  );
};

export default StepOne;

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
