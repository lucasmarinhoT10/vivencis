import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { theme } from '@theme/theme';
import CustomDrawerItem from '@components/CustomDrawerItem';
import Divider from '@components/Divider';
import Spacer from '@components/Spacer';
import ListItem from '@components/ListItem';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { useNavigation } from '@react-navigation/native';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const navigation = useNavigation();
  const renderImage = () => (
    <Image
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfkt0CBNhM63vyEeZlXjnW5TqyWQDwubF6OPRWjJgcFrSKJOhzLRE0SIHvqh1rt558Tg&usqp=CAU',
      }}
      style={styles.image}
    />
  );
  const renderIcon = () => (
    <Icon
      name={'open-in-new'}
      iconLibrary={'MaterialIcons'}
      color={theme.colors.text.secondary}
      size={'small'}
    />
  );
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <ListItem
        title={'Dr. Cristiano'}
        left={renderImage}
        spacerVertical={'small'}
        onPress={() => {
          navigation.navigate('ProfileInitial' as never);
        }}
        subtitle={
          <Button
            variant={'tertiary'}
            text={'Ver perfil'}
            right={renderIcon}
            color={theme.colors.text.secondary}
            textAlign={'left'}
            fontWeight={'400'}
            disabled
          />
        }
      />
      <Spacer direction={'horizontal'} size={'medium'}>
        <Divider />
      </Spacer>

      <View>
        <CustomDrawerItem
          label="Início"
          iconName="home"
          routeName="Home"
          iconLibrary="Octicons"
        />
        <CustomDrawerItem
          label="Pacientes"
          iconName="users"
          routeName="ClinicSelect"
          iconLibrary="Feather"
        />
        <CustomDrawerItem
          label="Soluções"
          iconName="users"
          routeName="Solutions"
          iconLibrary="Feather"
        />
        <CustomDrawerItem
          label="Chats"
          iconName=""
          routeName="Chats"
          iconLibrary="Feather"
        />
        <CustomDrawerItem
          label="Sobre"
          iconName=""
          routeName="On"
          iconLibrary="Feather"
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.small,
  },
});
