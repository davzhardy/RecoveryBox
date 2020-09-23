import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import { DateTime } from "luxon";

function HomeScreen () {

  const now = DateTime.local()
  const dayFormat = ''
  if (now.day === 1)
  dayFormat = 'st'
  else if (now.day === 2)
  dayFormat = 'nd' 
  else if (now.day === 3)
  dayFormat = 'rd'
  else dayFormat = 'th' 

  const username = useSelector((state) => state.user.username)

  return (
    <View style={styles.container}>
      <Text>Homescreen for {username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

});



export default HomeScreen;