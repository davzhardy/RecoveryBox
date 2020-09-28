import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector} from "react-redux";
import _ from 'lodash';
import { BoldAppText, MediumAppText } from '../styles/text'
import colors from '../styles/colors'
import { DateTime } from 'luxon'

function MeetingsSummary () {

  const chartTimePeriod = useSelector((state) => state.helper.chartTimePeriod)
  const millisPerDay = 1000 * 60 * 60 * 24
  const week = 7*millisPerDay;
  const month = 30*millisPerDay;

  function convertTime (string) {
    if (string === 'week') return week;
    else if (string === 'month') return month;
    else return false;
  }

  const timePeriod = convertTime(chartTimePeriod)
  const lastDay = useSelector((state) => state.helper.now) - timePeriod

  const historicalData = useSelector((state) => state.historicalData);
  const filteredData = _.filter(historicalData, el => el.date > lastDay)
  const meetingsData = _.map(filteredData, el => el.meetings);
  
  function meetingsReducer (arr) {
    const copyArr = arr.length ? arr.slice(0) : [0]
    const number = copyArr.reduce((acc, value) => acc + value)
    return number
  } 

  const meetingsToDisplay = meetingsReducer(meetingsData)

  return (
    <View style={{flexDirection: 'row'}}>
      <BoldAppText style={{fontSize: 15}}>You've been to </BoldAppText>
      <BoldAppText style={{fontSize: 15, color:colors.orange}}>{meetingsToDisplay} </BoldAppText>
      <BoldAppText style={{fontSize: 15}}>meetings</BoldAppText>
    </View>
  );
}

export default MeetingsSummary;