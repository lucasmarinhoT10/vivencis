import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from '@components/Icon';
import Typograph from '@components/Typograph';
import { theme } from '@theme/theme';

interface CustomDrawerItemProps {
  label: string;
  iconName: string;
  routeName: string;
  iconLibrary?: 'Feather' | 'MaterialIcons' | 'FontAwesome' | 'Octicons';
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
  label,
  iconName,
  routeName,
  iconLibrary = 'MaterialIcons',
}) => {
  const navigation = useNavigation();
  const state = navigation.getState();

  const isActive =
    state?.routes[state.index]?.name === routeName ||
    (!state?.routes[state.index]?.state && routeName === 'Home') ||
    state?.routes[state.index]?.state?.routes[
      state.routes[state.index]?.state?.index ?? 0
    ]?.name === routeName;

  const handlePress = () => {
    navigation.navigate(routeName as never);
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={handlePress}
    >
      <Icon
        name={iconName}
        iconLibrary={iconLibrary}
        color={theme.colors.primary.main}
      />
      <Typograph style={styles.label} color={theme.colors.primary.main}>
        {label}
      </Typograph>
    </TouchableOpacity>
  );
};

export default CustomDrawerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    backgroundColor: theme.colors.surface,
  },
  activeContainer: {
    backgroundColor: theme.colors.primary.light,
    borderLeftColor: theme.colors.primary.dark,
    borderLeftWidth: 5,
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    marginLeft: theme.spacing.medium,
  },
});
