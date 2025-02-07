import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import { IHeaderProps } from 'src/models/HeaderModels';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Typograph from '@components/Typograph';

const Header: React.FC<IHeaderProps> = ({
  title,
  onPressPrimary,
  isBack,
  isDrawer,
  sizeText,
}) => {
  return (
    <View style={styles.container}>
      {isBack || isDrawer ? (
        <View style={styles.content}>
          <TouchableOpacity onPress={onPressPrimary}>
            {isBack && (
              <AntDesign name="arrowleft" color={'#0A234C'} size={24} />
            )}
            {isDrawer && (
              <Ionicons name="menu-outline" color={'#0A234C'} size={24} />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.contentTitle}>
        <Typograph
          variant="options"
          fontWeight="700"
          textAlign="left"
          color={theme.colors.primary.title}
          style={[
            styles.contentTitle,
            sizeText ? { fontSize: sizeText } : { fontSize: 22 },
          ]}
        >
          {title}
        </Typograph>
      </View>
      <View style={styles.content}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    paddingHorizontal: theme.sizes.small,
    width: '100%',
    height: 56,
    backgroundColor: theme.colors.text.onPrimary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    width: '20%',
  },
  contentTitle: {
    width: '100%',

    lineHeight: 22,
    marginTop: 2,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
});

export default Header;
