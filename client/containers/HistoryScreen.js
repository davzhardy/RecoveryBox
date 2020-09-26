import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import _ from 'lodash'
import SuggestionItem from '../components/SuggestionItem'
import {useDispatch, useSelector } from "react-redux";
import {DateTime} from 'luxon'

function HistoryScreen () {

  const selectedDate = useSelector((state) => state.helper.selectedDate)
  const UTCadjustment = 7200000
  const seladj = selectedDate - UTCadjustment
  const fullHistoricalInfo = useSelector((state) => state.historicalData)
  const requiredInfo = _.filter(fullHistoricalInfo, el => el.date === seladj)
  //TODO remove UTC adjustment when data is sitting on server

  if (requiredInfo.length > 0) {
    return (
      <View style={styles.container}>
        <HomeWelcome historicalDate={selectedDate}/>
        <Text> Feeling level of {requiredInfo[0].feeling} </Text>
        <Text> Went to {requiredInfo[0].meetings} meetings </Text>
        {requiredInfo[0].moods.map(
          mood => <Text>Mood of {mood}</Text>
        )}
        {requiredInfo[0].suggestions.map(
          suggestion => <SuggestionItem
              key={suggestion}
              name={suggestion}
              selected={true}
            />
          )}
      </View>
    )
  } else {
    return (
      <Text>You have no data for today. That means you wern't registered at that time.</Text>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },

});



export default HistoryScreen;