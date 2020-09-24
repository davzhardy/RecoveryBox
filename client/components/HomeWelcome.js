import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import { DateTime } from 'luxon'
import Divider from '../components/Divider'
import { useNavigation } from '@react-navigation/native';

function HomeWelcome () {

  const navigation = useNavigation();

  // TODO - remove this comment const date = DateTime.fromISO("2020-09-21");

  const now = useSelector((state) => state.helper.now)
  let dayFormat = ''

  if (now.day === 1 || now.day === 21 || now.day === 31)
  dayFormat = 'st';
  else if (now.day === 2 || now.day === 22)
  dayFormat = 'nd';
  else if (now.day === 3 || now.day ===23)
  dayFormat = 'rd';
  else dayFormat = 'th';

  const formattedDate = now.toFormat(`d'${dayFormat}' MMM y`)  

  const username = useSelector((state) => state.user.username)

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity
          title="Calendar Icon"
          onPress={() => navigation.navigate('Calendar')}
        >
          <Image style={styles.icons} source={require('../assets/calendarIcon.png')}/>
        </TouchableOpacity>

        <View>
          <BoldAppText >Today</BoldAppText>
          <MediumAppText >{formattedDate}</MediumAppText>
        </View>

        <TouchableOpacity
          title="Settings Icon"
          onPress={() => navigation.navigate('Summary')}
        >
          <Image style={styles.icons} source={require('../assets/settingsIcon.png')}/>
        </TouchableOpacity>
      </View>

      <View>
        <BoldAppText>Hello {username}!</BoldAppText>
      </View>

      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
  },
  icons: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
});



export default HomeWelcome;