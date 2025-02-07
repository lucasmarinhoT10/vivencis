import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DynamicModal from '@components/DynamicModal';
import { Feather } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import Card from '@components/Card';
import Typograph from '@components/Typograph';
import Spacer from '@components/Spacer';
import { normalize } from '@utils/normalilze';

interface TransactionCardProps {
  category: string;
  value: string;
  description: string;
  id: string;
  type: 'receita' | 'despesa';
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  category,
  value,
  description,
  id,
  type,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleModal = () => setModalVisible(!modalVisible);

  const handleDelete = () => {
    toggleModal();
  };

  return (
    <Card
      elevated
      spacerHorizontal="medium"
      spacerVertical="medium"
      style={styles.card}
    >
      <View style={styles.header}>
        <Typograph variant="caption" color={theme.colors.text.secondary}>
          Categoria:
        </Typograph>
        <TouchableOpacity onPress={toggleMenu}>
          <Feather
            name="more-vertical"
            size={normalize(20)}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <Typograph variant="body" fontWeight="500" color="primary">
        {category}
      </Typograph>
      <Spacer size="medium" />
      <Typograph variant="caption" color={theme.colors.text.secondary}>
        Valor:
      </Typograph>
      <Typograph variant="body" fontWeight="500" color="primary">
        R$ {value}
      </Typograph>

      <Spacer size="medium" />
      <Typograph variant="caption" color={theme.colors.text.secondary}>
        Descrição:
      </Typograph>
      <Typograph variant="body" fontWeight="500" color="primary">
        {description}
      </Typograph>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => console.log('Editar')}
            style={styles.menuItem}
          >
            <Typograph variant="body">Editar</Typograph>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.menuItem}>
            <Typograph variant="body">Excluir</Typograph>
          </TouchableOpacity>
        </View>
      )}

      <DynamicModal
        visible={modalVisible}
        title={`Tem certeza que deseja excluir essa ${type === 'receita' ? 'receita' : 'despesa'}?`}
        subtitle="Se você excluir, não terá mais como recuperá-la!"
        image={require('@assets/images/delete-chat.png')}
        buttons={[
          {
            text: 'Cancelar',
            onPress: toggleModal,
            variant: 'secondary',
          },
          {
            text: 'Excluir',
            onPress: handleDelete,
            variant: 'tertiary',
          },
        ]}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: 30,
    minWidth: 120,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: theme.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: theme.spacing.extraSmall,
  },
});

export default TransactionCard;
