import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import MeetingsSummary from '../components/MeetingsSummary'
import FeelingGraph from '../components/graphs/FeelingGraph'
import MoodVisuals from '../components/graphs/MoodVisuals'
import SuggestionsVisuals from '../components/graphs/SuggestionsVisuals'
import { Dimensions } from "react-native";
import Constants from 'expo-constants';


function SummaryScreen () {

  const windowHeight = Dimensions.get('window').height;
  const statusBarHeight = Constants.statusBarHeight
  const fullHeight = windowHeight + statusBarHeight;

  const dynamicStyle = {
    height: fullHeight,
    paddingTop: statusBarHeight,
  };

  const chartHeight = {
    height: fullHeight/4,
  };

  return (
    <ScrollView >
      <View style={[styles.container,  dynamicStyle]}>
        <Text>Days in recovery</Text>
        <View styles={chartHeight}>
        <MeetingsSummary />
        </View>
        <View styles={chartHeight}>
        <FeelingGraph />
        </View>
        <View styles={chartHeight}>
        <MoodVisuals />
        </View>
        <View styles={chartHeight}>
        <SuggestionsVisuals/>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },

});



export default SummaryScreen;