import { theme } from '@theme/theme';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Typograph from '@components/Typograph';
import { IMessageProps } from 'src/models/MessageModels';

const MessageCard: React.FC<IMessageProps> = ({
  selected,
  handleSelect,
  senderMe,
  data,
  handleLongPressItem,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        senderMe ? styles.container : styles.containerMe,
        selected && styles.selectedContainer,
      ]}
      onLongPress={handleLongPressItem}
      onPress={handleSelect}
      delayLongPress={300}
    >
      <View style={[senderMe ? styles.contentMe : styles.content]}>
        <View>
          <Typograph
            color={
              senderMe ? theme.colors.text.onPrimary : theme.colors.text.primary
            }
          >
            {data?.mensagem}
          </Typograph>
        </View>
        <View style={styles.hourView}>
          <Typograph
            variant="caption"
            color={
              senderMe ? theme.colors.text.onPrimary : theme.colors.text.primary
            }
          >
            {data?.horaDeEnvio}
          </Typograph>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  containerMe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  selectedContainer: {
    backgroundColor: theme.colors.primary.extraLight,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: theme.colors.borderMedium,
    justifyContent: 'space-between',
    padding: theme.spacing.medium,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
  },
  hourView: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  contentMe: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'space-between',
    padding: theme.spacing.medium,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default MessageCard;
