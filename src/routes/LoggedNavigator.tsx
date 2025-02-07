import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';

import HomeLoggedScreen from '@modules/Auth/screens/HomeLogged';
import ProjectsScreen from '@modules/Auth/screens/Projects';
import ShipmentsScreen from '@modules/Auth/screens/Shipments';
import ProfileScreen from '@modules/Auth/screens/Profile';
import Remessas from '@assets/svgs/tabs/remessas';
import SignInScreen from '@modules/Auth/screens/SignIn';
import RecoverScreen from '@modules/Auth/screens/Recover';
import ShipmentsDetailsScreen from '@modules/Auth/screens/Shipments/ShipmentsDetails';
import DetailsProjectsScreen from '@modules/Auth/screens/Projects/DetailsProjects';
import AssignTechnicianScreen from '@modules/Auth/screens/Projects/AssignTechnician';
import ManageTechniciansScreen from '@modules/Auth/screens/ManageTechnicians';
import TechnicalRegistrationScreen from '@modules/Auth/screens/ManageTechnicians/TechnicalRegistration';
import useAuthStore from 'src/store/authStore';
import SignUpScreen from '@modules/Auth/screens/Register';
import OSDetails from '@modules/Auth/screens/Projects/OSDetails';
import OSClose from '@modules/Auth/screens/Projects/OSClose';
import ManualOSClose from '@modules/Auth/screens/Projects/ManualOSClose';
import { getTokenTemp } from '@modules/Auth/screens/Register/services/register.services';
import useUserStore from 'src/store/userStore';
import ChangePasswordScreen from '@modules/Auth/screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ShipmentsStack = createNativeStackNavigator();
const ProjectsStack = createNativeStackNavigator();
const TechniciansStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProjectsStackNavigator = () => {
  return (
    <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProjectsStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectsStack.Screen
        name="DetailsProjects"
        component={DetailsProjectsScreen}
      />
      <ProjectsStack.Screen name="OSDetails" component={OSDetails} />
      <ProjectsStack.Screen name="OSClose" component={OSClose} />
      <ProjectsStack.Screen name="ManualOSClose" component={ManualOSClose} />
      <ProjectsStack.Screen
        name="AssignTechnician"
        component={AssignTechnicianScreen}
      />
    </ProjectsStack.Navigator>
  );
};
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeLoggedScreen" component={HomeLoggedScreen} />
      <HomeStack.Screen
        name="DetailsProjects"
        component={DetailsProjectsScreen}
      />
      <ProjectsStack.Screen name="OSDetails" component={OSDetails} />
      <ProjectsStack.Screen name="OSClose" component={OSClose} />
    </HomeStack.Navigator>
  );
};
const TechniciansStackNavigator = () => {
  return (
    <TechniciansStack.Navigator screenOptions={{ headerShown: false }}>
      <TechniciansStack.Screen
        name="ManageTechnicians"
        component={ManageTechniciansScreen}
      />
      <TechniciansStack.Screen
        name="AssignTechnician"
        component={AssignTechnicianScreen}
      />
      <TechniciansStack.Screen
        name="TechnicalRegistration"
        component={TechnicalRegistrationScreen}
      />
    </TechniciansStack.Navigator>
  );
};

const ShipmentsStackNavigator = () => {
  return (
    <ShipmentsStack.Navigator screenOptions={{ headerShown: false }}>
      <ShipmentsStack.Screen name="Shipments" component={ShipmentsScreen} />
      <ShipmentsStack.Screen
        name="ShipmentsDetails"
        component={ShipmentsDetailsScreen}
      />
    </ShipmentsStack.Navigator>
  );
};

const LoggedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Inicio') {
            return <Feather name={'home'} size={size} color={color} />;
          } else if (route.name === 'Projetos') {
            return <AntDesign name={'folder1'} size={size} color={color} />;
          } else if (route.name === 'Técnicos') {
            return <Feather name={'tool'} size={size} color={color} />;
          } else if (route.name === 'Remessas') {
            return <Remessas color={color} />;
          } else if (route.name === 'Perfil') {
            return <Feather name={'user'} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#2A7287',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Projetos" component={ProjectsStackNavigator} />
      <Tab.Screen name="Técnicos" component={TechniciansStackNavigator} />
      <Tab.Screen name="Remessas" component={ShipmentsStackNavigator} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const LoggedNavigator = () => {
  const { token } = useAuthStore();

  const isLogged = token !== '';
  return (
    <Stack.Navigator initialRouteName={isLogged ? 'HomeLogged' : 'SignIn'}>
      <Stack.Screen
        name="HomeLogged"
        component={LoggedInTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recover"
        component={RecoverScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoggedNavigator;
