import React from 'react';
import { Modal, View, Image, StyleSheet, ViewStyle } from 'react-native';
import Typograph from '../Typograph';
import Divider from '../Divider';
import Button from '../Button';
import { theme } from '../../theme/theme';
import Spacer from '@components/Spacer';

interface ActionButton {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

interface DynamicModalProps {
  visible: boolean;
  image: any;
  title?: string;
  subtitle?: string;
  buttons: ActionButton[];
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  visible,
  image,
  title,
  subtitle,
  buttons,
}) => {
  const getButtonStyle = (totalButtons: number, index: number): ViewStyle => {
    if (totalButtons === 1) {
      return { width: '100%' };
    }
    if (totalButtons === 2) {
      return { flex: 1, marginLeft: index !== 0 ? theme.spacing.small : 0 };
    }
    return {};
  };

  return (
    <Modal visible={visible} transparent animationType={'fade'}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image source={image} style={styles.image} resizeMode={'contain'} />

          {title && (
            <Typograph
              variant={'body'}
              color={'primary'}
              textAlign={'left'}
              fontWeight={'600'}
            >
              {title}
            </Typograph>
          )}
          {subtitle && <Spacer size={'small'} />}
          {subtitle && (
            <Typograph
              variant={'caption'}
              color={'text.secondary'}
              textAlign={'left'}
            >
              {subtitle}
            </Typograph>
          )}

          <Divider />

          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                text={button.text}
                textAlign={'center'}
                onPress={button.onPress}
                variant={button.variant || 'primary'}
                fullWidth={buttons.length === 1}
                style={getButtonStyle(buttons.length, index)}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: theme.spacing.medium,
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 280,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DynamicModal;
