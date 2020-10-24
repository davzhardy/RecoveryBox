import React from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../../styles/text'
import Divider from '../Divider'
import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop, Svg } from "react-native-svg";
import colors from '../../styles/colors'
import { VictoryArea, VictoryChart, VictoryAxis } from './Victory';



function FeelingGraph () {

  const chartTimePeriod = useSelector((state) => state.helper.chartTimePeriod)
  const millisPerDay = 1000 * 60 * 60 * 24
  const week = 7*millisPerDay;
  const month = 30*millisPerDay;
  const now = useSelector((state) => state.helper.now)

  function convertTime (string) {
    if (string === 'week') return week;
    else if (string === 'month') return month;
    else return now;
  }

  const timePeriod = convertTime(chartTimePeriod)
  const lastDay = now - timePeriod

  const historicalData = useSelector((state) => state.historicalData);
  const periodData = _.filter(historicalData, el => el.date > lastDay)

  function compareItem(a, b){
    if(a.date < b.date){
      return -1;
    } else if(a.date > b.date) {
      return 1;
    } else {
      return 0;
    }
  }

  const filteredData = periodData.sort(compareItem)
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

  if (periodData.length) {
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
        <View style={styles.key}>
          <View style={[styles.keyWrapper, {marginBottom:-10}]}>
            <View style={styles.box1}/>
            <MediumAppText>Feeling</MediumAppText>
          </View>
          <View style={styles.keyWrapper}>
            <View style={styles.box2}/>
            <MediumAppText>Meetings</MediumAppText>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <>
        <MediumAppText>Please add some data to display this chart</MediumAppText>
        <br></br>
      </>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  key: {
    position: 'absolute',
    flexDirection: 'column',
    left:10,
    top:30,
  },
  keyWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  box1: {
    backgroundColor: colors.green,
    width: 7,
    height: 7,
    marginTop: -7,
    marginRight: 5,
  },
  box2: {
    backgroundColor: colors.blue,
    width: 7,
    height: 7,
    marginTop: -7,
    marginRight: 5,
  },
});


export default FeelingGraph;