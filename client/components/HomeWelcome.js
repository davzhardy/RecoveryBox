import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useSelector } from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import Divider from '../components/Divider'
import { useNavigation } from '@react-navigation/native';
import { DateTime, Duration } from 'luxon'

function HomeWelcome ( { historicalDate = false }) {

  const navigation = useNavigation();

  const todaysDate = useSelector((state) => state.helper.now);

  const dateToUse = historicalDate ? historicalDate : todaysDate;
  const now = DateTime.fromMillis(dateToUse);
  let dayFormat = ''

  if (now.day === 1 || now.day === 21 || now.day === 31)
  dayFormat = 'st';
  else if (now.day === 2 || now.day === 22)
  dayFormat = 'nd';
  else if (now.day === 3 || now.day ===23)
  dayFormat = 'rd';
  else dayFormat = 'th';

  const formattedDate = now.toFormat(`d'${dayFormat}' MMM y`)  
  const duration = Duration.fromMillis((todaysDate - historicalDate)).toFormat('d')

  const username = useSelector((state) => state.user.username)

  const displayDate = historicalDate ? `${duration} days ago` : 'Today'
  const displayUsername = historicalDate ? <></> : <View><BoldAppText>Hello {username}!</BoldAppText></View>

  if (historicalDate) {
    return (
      <View style={styles.container}>
        <View>
          <BoldAppText>{formattedDate}</BoldAppText>
          <MediumAppText >{displayDate}</MediumAppText>
        </View>
        <Divider/>
      </View>
    )
  } else {
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
          <BoldAppText>{displayDate}</BoldAppText>
          <MediumAppText >{formattedDate}</MediumAppText>
        </View>

        <TouchableOpacity
          title="Settings Icon"
          onPress={() => navigation.navigate('Summary')}
        >
          <Image style={styles.icons} source={require('../assets/settingsIcon.png')}/>
        </TouchableOpacity>
      </View>
      {displayUsername}
      <Divider/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
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