import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector} from "react-redux";
import _ from 'lodash';

function MeetingsSummary () {

  const week = 7
  const month = 30

  const historicalData = useSelector((state) => state.historicalData);
  const meetingsData = _.map(historicalData, el => el.meetings) 
  const [timePeriod, setTimePeriod] = useState(week)

  function meetingsReducer (arr, time) {
    const copyArr = arr.slice(0, time-1) 
    const number = copyArr.reduce((acc, value) => acc + value)
    return number
  } 

  const meetingsToDisplay = meetingsReducer(meetingsData, timePeriod)

  return (
    <View>
      <Text>You've been to {meetingsToDisplay} meetings the last {timePeriod} days</Text>
    </View>
  );
}

export default MeetingsSummary;