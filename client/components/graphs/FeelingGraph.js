import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../../styles/text'
import Divider from '../Divider'
import { VictoryArea, VictoryBar, VictoryChart, VictoryAxis } from './Victory';
import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop, Svg } from "react-native-svg";
import colors from '../../styles/colors'



function FeelingGraph () {

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
// TODO if put requests are implemented for historical calendar days then this data will need to be sorted by date before being used

  const feelingData = _.map(filteredData, el => el.feeling) 
  const dateData = _.map(filteredData, el => el.date)
  const formattedDateData = dateData.map(date => DateTime.fromMillis(date).toFormat('LLL dd'))
  const meetingData = _.map(filteredData, el => el.meetings) 

  function create(array1, array2, array3) {
    let list = [];
    let count = 0;
    for (let i of array1) {
      let obj = {}
      obj.date = i
      obj.feeling = array2[count]
      obj.meetings = array3[count]
      list.push(obj)
      count++
    }
    return list
  }

  const combinedList = create(formattedDateData, feelingData, meetingData)
  console.log(combinedList)

  return (
    <View style={styles.container}>
      <BoldAppText style={{color: colors.lightGray, marginBottom:-40, fontSize:14, alignSelf:'flex-start',}}>Feeling & Meetings</BoldAppText>
      <VictoryChart width={400} height={280} style= {{
        parent: {
          overflow: 'visible',
        }
      }}>
        <VictoryArea 
        data={combinedList} 
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        x="date" 
        y="feeling"
        style={{ 
          data: { 
            fill: colors.green,
            opacity: 0.75,
          },
          parent: {}
          }}
        interpolation="natural"
        domain={{y: [-2, 12]}}
        />
        <VictoryArea
        data={combinedList} 
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        x="date" 
        y="meetings"
        style={{ 
          data: { 
            fill: colors.blue,
            opacity: 0.6
          },
          parent: {}
          }}
        interpolation="natural"

        />
        <VictoryAxis
          tickCount={4}
          style = {{
            tickLabels: {fontSize: 10},
            axis: {stroke: "none"},
          }}
          

        />

      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default FeelingGraph;