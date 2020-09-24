import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from "react-redux";
import MoodGraph from '../components/MoodGraph'

function SummaryScreen () {

  const historicalData = useSelector((state) => state.historicalData);
  console.log(historicalData)

  return (
    <View style={styles.container}>
      <Text>Days in recovery</Text>
      <Text>History of Meetings</Text>
      <MoodGraph/>
      <Text>Top Moods</Text>
      <Text>Top Suggestions</Text>
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



export default SummaryScreen;