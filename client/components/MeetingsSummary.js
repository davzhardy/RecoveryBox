import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector} from "react-redux";
import _ from 'lodash';
import { BoldAppText, MediumAppText } from '../styles/text'

function MeetingsSummary () {

  const week = 7
  const month = 30

  const historicalData = useSelector((state) => state.historicalData);
  const meetingsData = _.map(historicalData, el => el.meetings) 
  const [timePeriod, setTimePeriod] = useState(week)

  function meetingsReducer (arr, time) {
    const copyArr = arr.slice(-time) 
    const number = copyArr.reduce((acc, value) => acc + value)
    return number
  } 

  const meetingsToDisplay = meetingsReducer(meetingsData, timePeriod)

  return (
    <View>
      <BoldAppText>You've been to {meetingsToDisplay} meetings the last {timePeriod} days</BoldAppText>
    </View>
  );
}

export default MeetingsSummary;