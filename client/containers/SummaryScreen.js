import React, { useEffect } from 'react';
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
import _ from 'lodash';
import { Duration, DateTime } from 'luxon'

function SummaryScreen ({ route }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "UPDATE_ROUTE",
      payload: route.name,
    })
  },[])


  const windowHeight = Dimensions.get('window').height;
  const statusBarHeight = Constants.statusBarHeight
  const fullHeight = windowHeight + statusBarHeight;

  const dynamicStyle = {
    height: fullHeight,
    // paddingTop: statusBarHeight,
  };

  const chartTimePeriod = useSelector((state) => state.helper.chartTimePeriod)

  function clickHandler (timePeriod) {
    dispatch({
      type: 'UPDATE_TIMEPERIOD',
      payload: timePeriod
    })
  }

  const historicalData = useSelector((state) => state.historicalData);
  const dateData = _.map(historicalData, el => el.date)
  const firstDate = dateData.sort((a,b)=>a-b)[0]
  const now = useSelector((state) => state.helper.now)
  const durationMillis = now-firstDate
  const millisPerDay = 1000 * 60 * 60 * 24
  const durationDays = Math.round(durationMillis/millisPerDay)

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
            <BoldAppText style={{fontSize: 15, color:colors.orange}}>{durationDays} </BoldAppText>
            <BoldAppText style={{fontSize: 15}}>days in recovery</BoldAppText>
            </View>
            <View>
              <MeetingsSummary />
            </View>
          </View>
          <View style={styles.feelingGraph}>
            <FeelingGraph />
          </View>
          <View style={styles.moodGraph}>
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
  moodGraph: {
    width:'100%'
  }
});



export default SummaryScreen;