import { theme } from "@theme/theme";
import React from "react";
import { View, StyleSheet, Text } from "react-native";


const HeaderAssignCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        <Text style={styles.warningTitle}>Atenção</Text>: A ordem de serviço já está atrelada ao parceiro e deverá ser realizada até o dia 00/00/0000.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: theme.colors.primary.main,
    alignSelf:'center',
    height:60,
    width:'100%',
    borderRadius:4,
    marginBottom:16,
    padding:14,
    justifyContent:'center',
  },
  paragraph: {
    color:'#FFF',
  },
  warningTitle:{
    fontWeight:600,
  }
})


export default HeaderAssignCard;