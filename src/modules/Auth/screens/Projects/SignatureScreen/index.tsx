// SignatureScreen.js
import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';

const SignatureScreen = ({
  setSignatureData,
  onClose,
}: {
  setSignatureData: (string: string) => void;
  onClose: () => void;
}) => {
  const signatureRef = useRef(null);

  const handleOK = (signature: any) => {
    setSignatureData(signature);
    onClose();
  };

  const handleEmpty = () => {
    console.log('Nenhuma assinatura foi feita. aqui');
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleCancel = () => {
    console.log('Nenhuma assinatura foi feita. aqui');
  };

  const webStyle = `
    .m-signature-pad {
      border: none !important;
      box-shadow: none !important;
    }
    .m-signature-pad--footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .button {
      background-color: #0aa;
      color: #fff;
      border-radius: 4px;
      padding: 6px 12px;
      margin: 0 4px;
    }
  `;

  return (
    <View style={styles.container}>
      <Signature
        ref={signatureRef}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onEnd={handleCancel}
        descriptionText="Assine aqui"
        clearText="Limpar"
        confirmText="Salvar"
        webStyle={webStyle}
        autoClear={false}
        androidHardwareAccelerationDisabled
      />
    </View>
  );
};

export default SignatureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },

  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
