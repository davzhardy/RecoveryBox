import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CalendarDH from '../components/Calendar'

function CalendarScreen ({ navigation } ) {

  //TODO if you press on calendar with todays date it takes you back to the home screen and not to a history screen
  return (
    <View style={styles.container}>
      <CalendarDH/>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Back to HomeScreen</Text>
      </TouchableOpacity>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },

});


export default CalendarScreen;