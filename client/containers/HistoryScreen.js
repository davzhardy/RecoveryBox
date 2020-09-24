import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Meetings from '../components/Meetings'
import SuggestionsList from '../components/SuggestionsList'
import {useDispatch, useSelector } from "react-redux";
import { DateTime } from 'luxon'

function HistoryScreen () {

  const selectedDate = useSelector((state) => state.helper.selectedDate)
  const header = 'hello'

  return (
    <View style={styles.container}>
      <Text>{header}</Text>
      <HomeWelcome/>
      <Feeling/>
      <Meetings/>
      <SuggestionsList/>
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