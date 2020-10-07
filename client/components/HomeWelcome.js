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

  const username = useSelector((state) => state.user.username);
  const userFirstName = useSelector((state) => state.user.firstName);

  const displayDate = historicalDate ? `${duration} days ago` : 'Today'
  const displayUsername = historicalDate ? <></> : <View><BoldAppText>Hello {userFirstName} !</BoldAppText></View>

  if (historicalDate) {
    return (
      <View style={[styles.container, styles.containerhistorical]}>
        <View>
          <BoldAppText>{formattedDate}</BoldAppText>
          <MediumAppText >{displayDate}</MediumAppText>
        </View>
        <Divider/>
      </View>
    )
  } else {
  return (
      <View>
        {displayUsername}
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
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
  containerhistorical: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});



export default HomeWelcome;