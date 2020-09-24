import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import MeetingsSummary from '../components/MeetingsSummary'
import FeelingGraph from '../components/graphs/FeelingGraph'
import MoodVisuals from '../components/graphs/MoodVisuals'
import SuggestionsVisuals from '../components/graphs/SuggestionsVisuals'

function SummaryScreen () {

  return (
    <ScrollView style={styles.container}>
      <Text>Days in recovery</Text>
      <MeetingsSummary/>
      <FeelingGraph/>
      <MoodVisuals/>
      <SuggestionsVisuals/>
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