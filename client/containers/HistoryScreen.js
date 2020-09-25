import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Meetings from '../components/Meetings'
import Moods from '../components/Moods'
import SuggestionsList from '../components/SuggestionsList'
import _ from 'lodash'
import {useDispatch, useSelector } from "react-redux";
import { DateTime } from 'luxon'

function HistoryScreen () {

  const selectedDate = useSelector((state) => state.helper.selectedDate)
  const fullHistoricalInfo = useSelector((state) => state.historicalData)
  const requiredInfo = _.filter(fullHistoricalInfo, el => el.date === selectedDate)
  console.log(selectedDate)
  console.log(fullHistoricalInfo)
  console.log(requiredInfo)

const arr = [   1600293600000,
1600380000000,
1600466400000,
 1600552800000,
1600639200000,
 1600725600000,
1600812000000,
 1600898400000]

 console.log(DateTime.fromMillis(selectedDate))


  return (
    <View style={styles.container}>
      <HomeWelcome historicalDate={selectedDate}/>
      <Feeling/>
      <Meetings/>
      <SuggestionsList/>
      <Moods/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },

});



export default HistoryScreen;