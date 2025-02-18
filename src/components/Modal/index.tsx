import Button from '@components/Button';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { theme } from '@theme/theme';
import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface ModalConfirmationProps {
  visible: boolean;
  title: string;
  subtitle: string;
  icon?: boolean;
  isConfirm?: boolean;
  footerTitle?: string;
  hasBottom?: boolean;

  onClose: () => void;
  onConfirm: (date: string, time: string, observation: string) => void;
  okText?: string;
  cancelText?: string;
  confirmText?: string;
}

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  subtitle,
  icon = true,
  isConfirm = false,
  footerTitle,
  hasBottom = false,
  cancelText,
  okText,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [observation, setObservation] = useState('');

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={!hasBottom ? styles.modalBackground : styles.hasBottom}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose}>
            <AntDesign
              name="close"
              size={18}
              style={styles.close}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.rowTitle}>
            <View style={styles.title}>
              {icon && (
                <MaterialIcons
                  name="access-time"
                  size={50}
                  color={theme.colors.primary.quaternary}
                />
              )}
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {isConfirm == false && (
            <Button
              onPress={() => onConfirm(date, time, observation)}
              variant="secondary"
              color={theme.colors.primary.button}
              text={okText}
              style={{
                height: 50,
                borderWidth: 1.5,
                borderColor: theme.colors.primary.button,
              }}
            />
          )}
          <Text
            style={{
              fontWeight: 600,
              color: '#484C52',
              alignSelf: 'center',
              marginBottom: 26,
              fontSize: 16,
            }}
          >
            {footerTitle}
          </Text>
          {isConfirm && (
            <View style={styles.footerButtons}>
              <Button
                onPress={() => onClose()}
                variant="quinary"
                color={theme.colors.primary.button}
                text={cancelText}
                style={{
                  borderRadius: 8,
                  height: 56,
                  width: '45%',
                  backgroundColor: '#fff',
                }}
              />
              <Button
                onPress={() => onConfirm(date, time, observation)}
                variant="quinary"
                color={'#fff'}
                text="Confirmar"
                style={{
                  borderRadius: 8,
                  height: 56,
                  width: '45%',
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hasBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '110%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    gap: 4,
    width: '90%',
    height: 'auto',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 16,
    alignSelf: 'center',
  },
  rowTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },

  close: { position: 'absolute', top: 0, right: 10, zIndex: 10 },

  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.colors.primary.placeholder,
    marginBottom: 18,
    textAlign: 'center',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 2,
  },

  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
});
