import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import CalendarDH from '../components/Calendar'
import colors from '../styles/colors'
import {useDispatch, useSelector } from "react-redux";


function CalendarScreen ({ navigation, route } ) {

  //TODO if you press on calendar with todays date it takes you back to the home screen and not to a history screen
  
  const rootName = useSelector((state) => state.helper.routeName);
  
  return (
    <View style={styles.container}>
      <View>
        <CalendarDH style={styles.calendar}/>
      </View>
      <View >
        <TouchableOpacity style={styles.return} onPress={() => navigation.navigate(rootName)}>
          <Image style={styles.image} source={require('../assets/close.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.platinum,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 1
  },
  image: {
    height: 30,
    width: 30,
  },
  return: {
    marginTop: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center'
  }

});


export default CalendarScreen;