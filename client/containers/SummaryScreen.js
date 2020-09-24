import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import FeelingGraph from '../components/FeelingGraph'
import MoodVisuals from '../components/MoodVisuals'
import SuggestionsVisuals from '../components/SuggestionsVisuals'

function SummaryScreen () {

  return (
    <ScrollView style={styles.container}>
      <Text>Days in recovery</Text>
      <Text>History of Meetings</Text>
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