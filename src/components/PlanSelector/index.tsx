import React from 'react';
import { StyleSheet, View } from 'react-native';

import Card from '@components/Card';
import Typograph from '@components/Typograph';
import Button from '@components/Button';
import Line from '@components/Line';
import Icon from '@components/Icon';

interface PlanSelectorProps {
  price: string; // Valor por mês
  features: { icon: 'check' | 'x'; text: string }[]; // Lista de itens com ícones e texto
  onButtonPress?: () => void; // Callback para o botão
}

const PlanSelector: React.FC<PlanSelectorProps> = ({
  price,
  features,

  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Typograph style={styles.title}>
          R$
          <Typograph fontWeight="700" variant="title">
            {price}
          </Typograph>{' '}
          <Typograph>Por mês</Typograph>
        </Typograph>
        <Line />
        {features.map((feature, index) => (
          <Typograph key={index} style={styles.feature}>
            {' '}
            <Icon
              name={feature.icon}
              size="medium"
              color={feature.icon === 'check' ? 'success' : 'error'}
              iconLibrary="Feather"
              marginRight={8}
            />{' '}
            {feature.text}
          </Typograph>
        ))}
        <Button
          text="Contratar"
          style={styles.button}
          onPress={onButtonPress}
        />
      </Card>
    </View>
  );
};

export default PlanSelector;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 24,
    gap: 8,
  },
  button: {
    marginTop: 6,
    marginBottom: 14,
  },
  title: {
    marginTop: 12,
    marginBottom: 8,
    padding: 6,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
});
