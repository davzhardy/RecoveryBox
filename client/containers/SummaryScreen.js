import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import FeelingGraph from '../components/FeelingGraph'
import MoodVisuals from '../components/MoodVisuals'

function SummaryScreen () {

  return (
    <ScrollView style={styles.container}>
      <Text>Days in recovery</Text>
      <Text>History of Meetings</Text>
      <FeelingGraph/>
      <MoodVisuals/>
      <Text>Top Suggestions</Text>
    </ScrollView>
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