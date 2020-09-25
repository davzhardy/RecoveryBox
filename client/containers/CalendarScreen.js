import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CalendarDH from '../components/Calendar'

function CalendarScreen ({ navigation } ) {

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