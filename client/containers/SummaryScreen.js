import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import MeetingsSummary from '../components/MeetingsSummary'
import FeelingGraph from '../components/graphs/FeelingGraph'
import MoodVisuals from '../components/graphs/MoodVisuals'
import SuggestionsVisuals from '../components/graphs/SuggestionsVisuals'
import Footer from '../components/Footer'
import { Dimensions } from "react-native";
import Constants from 'expo-constants';
import { BoldAppText, MediumAppText } from '../styles/text';
import colors from '../styles/colors';

function SummaryScreen () {

  const windowHeight = Dimensions.get('window').height;
  const statusBarHeight = Constants.statusBarHeight
  const fullHeight = windowHeight + statusBarHeight;

  const dynamicStyle = {
    height: fullHeight,
    // paddingTop: statusBarHeight,
  };


  const dispatch = useDispatch();
  const chartTimePeriod = useSelector((state) => state.helper.chartTimePeriod)

  function clickHandler (timePeriod) {
    console.log('hello')
    dispatch({
      type: 'UPDATE_TIMEPERIOD',
      payload: timePeriod
    })
  }

  //TODO change the current onpress to something swipeable?
  // TODO add key for first graph
  // TODO add values on graphs when clicked

  return (
    <View style={[styles.container,  dynamicStyle]}>
        <View style={styles.options}>
          <View >
            <TouchableOpacity onPress={()=>clickHandler('week')}>
              <MediumAppText style={chartTimePeriod === 'week' ? styles.optionsTextSelected : styles.optionsTextUnselected}>WEEK</MediumAppText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={()=>clickHandler('month')}>
              <MediumAppText  style={chartTimePeriod === 'month' ? styles.optionsTextSelected : styles.optionsTextUnselected}>MONTH</MediumAppText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={()=>clickHandler('month')}>
              <MediumAppText onPress={()=>clickHandler('all-time')} style={chartTimePeriod === 'all-time' ? styles.optionsTextSelected : styles.optionsTextUnselected}>ALL-TIME</MediumAppText>
            </TouchableOpacity>
          </View>
        </View>
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.textWrapper}>
            <View style={{flexDirection: 'row'}}>
            <BoldAppText style={{fontSize: 15, color:colors.orange}}>xxx </BoldAppText>
            <BoldAppText style={{fontSize: 15}}>days in recovery</BoldAppText>
            </View>
            <View>
              <MeetingsSummary />
            </View>
          </View>
          <View style={styles.feelingGraph}>
            <FeelingGraph />
          </View>
          <View >
            <MoodVisuals />
          </View>
          <View >
            <SuggestionsVisuals/>
          </View>
        </View>
      </ScrollView>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.platinum,
    flex: 1,
    paddingBottom: 65,
  },
  scrollView: {
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  options: {
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '95%'
  },
  optionsTextSelected: {
    marginTop: -3,
    marginRight: 7,
    borderBottomWidth: 2,
    borderColor: colors.blue,
    fontFamily: 'Montserrat_700Bold',
    color: colors.darkGrayFont,
    paddingBottom: 2,
  },
  optionsTextUnselected: {
    marginTop: -3,
    marginRight: 7,
    opacity: 0.5,
    fontFamily: 'Montserrat_500Medium',
    paddingBottom: 2,
  },
  textWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  feelingGraph: {
    marginBottom: -20
  },
});



export default SummaryScreen;