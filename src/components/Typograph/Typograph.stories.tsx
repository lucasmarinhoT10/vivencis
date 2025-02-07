import React from 'react';
import { View } from 'react-native';
import Typograph from './index';

export default {
  title: 'Typograph',
  component: Typograph,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['title', 'body', 'caption'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'onPrimary', 'onSecondary'],
    },
    fontWeight: {
      control: { type: 'select' },
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
  },
};

export const Default = () => (
  <View>
    <Typograph>Texto Padrão</Typograph>
  </View>
);

Default.args = {
  variant: 'body',
  color: 'primary',
  fontWeight: '400',
};

export const Title = () => (
  <View>
    <Typograph variant={'title'} color={'primary'} fontWeight={'700'}>
      Título com Peso 700
    </Typograph>
  </View>
);

export const Caption = () => (
  <View>
    <Typograph variant={'caption'} color={'secondary'} fontWeight={'300'}>
      Legenda com Peso 300
    </Typograph>
  </View>
);
