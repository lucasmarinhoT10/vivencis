import React, { useState } from 'react';
import Container from '@components/Container';
import { TouchableOpacity, View, StyleSheet,Text } from 'react-native';

import Spacer from '@components/Spacer';

import { useRoute, RouteProp } from '@react-navigation/native';
import { projectDetailsOsMock } from 'src/mocks/projectMock';
import { useNavigation } from '@react-navigation/native';

import { RootDrawerParamList } from '@routes/routes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { ListCardProjects } from '@components/ListCardProjects';

import TechnicianAssignmentCard from '@components/AssignTechnicianCard';
import Button from '@components/Button';
import HeaderAssignCard from '@components/HeaderAssignCard';

type AssignTechnicianScreenNavigationProp =
  BottomTabNavigationProp<RootDrawerParamList>;
type AssignTechnicianScreenRouteProp = RouteProp<
  RootDrawerParamList,
  'AssignTechnician'
>;

export default function AssignTechnicianScreen() {
  const navigation = useNavigation<AssignTechnicianScreenNavigationProp>();

  const route = useRoute<AssignTechnicianScreenRouteProp>();
  const { osNumber } = route.params;

  const [isTechnicianSelected, setIsTechnicianSelected] = useState(false);

  const handleTechnicianSelected = (isSelected: boolean) => {
    setIsTechnicianSelected(isSelected);
  };

  return (
    <Container scrollEnabled hasGoBack title={osNumber} spacerVertical="small">
      <View>
        {
          isTechnicianSelected && <HeaderAssignCard />
        }
        <TouchableOpacity
          onPress={() => navigation.navigate('ManageTechnicians')}
        >
          <TechnicianAssignmentCard onTechnicianSelected={handleTechnicianSelected}/>
        </TouchableOpacity>
        <Spacer size="medium" />
        {projectDetailsOsMock.map((project) => (
          <View key={project.id}>
            <ListCardProjects isTechnicianSelected={isTechnicianSelected} showInfoCard={!isTechnicianSelected}  title={project.title} items={project.items} />
          </View>
        ))}
      </View>
      
      {isTechnicianSelected && <View style={styles.footerButtons}>
        <Button
          style={styles.buttonSize}
          fontWeight='600'
          variant='secondary' 
          text='Manual de preenchimento' 
          />
        <Button
          style={styles.buttonSize}
          fontWeight='600'
          variant='quinary' 
          text='Executar  ordem de serviço' 
          />
      </View>  }
    </Container>
  );
}

const styles = StyleSheet.create({
  footerButtons:{
    gap:11,
    marginBottom:25
  },
  buttonSize:{
    height:56
  },
});