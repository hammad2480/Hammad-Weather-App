import React,{memo} from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const WeatherDetailCard = ({ icon, label, value }) => {
    return (
      <View style={styles.container}>
        <View style={styles.svgView}>
          <SvgXml xml={icon} width={30} height={30} />
          <Text style={[styles.cardText,{marginLeft:'10%'}]}>{label}</Text>
        </View>
        <Text style={styles.cardText}>{value}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      width:'100%',
      height:'30%',
    },
    svgView: {
      flexDirection: 'row',
      alignItems: 'center',
      width:'50%',
    },
    cardText: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'Nunito-Regular',
      alignSelf:'center'
    },
  });
  
  export default memo(WeatherDetailCard)