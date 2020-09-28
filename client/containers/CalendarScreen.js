import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CalendarDH from '../components/Calendar'
import colors from '../styles/colors'

function CalendarScreen ({ navigation } ) {

  //TODO if you press on calendar with todays date it takes you back to the home screen and not to a history screen
  return (
    <View style={styles.container}>
      <View>
        <CalendarDH style={styles.calendar}/>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Back to HomeScreen</Text>
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
  }

});


export default CalendarScreen;