import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootDrawerParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HomeLogged: undefined;
  Projects: undefined;
  DetailsProjects: { projectId?: number };
  AssignTechnician: { osNumber: string };
  ManageTechnicians: undefined;
  TechnicalRegistration: undefined;
  Shipments: undefined;
  ShipmentsDetails: undefined;
  Profile: undefined;
  RecoverPassword: { email: string };
};

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
};
