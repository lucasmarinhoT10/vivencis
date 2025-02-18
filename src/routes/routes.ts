import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootDrawerParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HomeLogged: undefined;
  Projects: undefined;
  DetailsProjects: { id?: number, inscrito?: string };
  AddProof: undefined;
  AssignTechnician: { osNumber: string };
  ManageTechnicians: undefined;
  TechnicalRegistration: undefined;
  Shipments: undefined;
  ShipmentsDetails: undefined;
  Profile: undefined;
  ProfileTechnical: undefined;
  PreRequisiteVoucher: undefined;
  RegisteredCertifications: undefined;
  Extracts: undefined;
  ExtractsDetails: undefined;
  Inventory: undefined;
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
