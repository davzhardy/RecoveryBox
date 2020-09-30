import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../../styles/text'
import Divider from '../Divider'
import { VictoryScatter, VictoryGroup } from './Victory';
import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop } from "react-native-svg";
import colors from '../../styles/colors'


function MoodVisuals () {

  const moodsToShow = 5;
  // TODO make the number of moods you show customisable

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
  console.log(periodData)
  const moodsData = _.map(periodData, el => el.moods)
  
  function create (array) {
    let obj = {}
    for (let i of array) {
      for (let j of i) {
        if (Object.keys(obj).includes(j)) {
          obj[j] = obj[j]+1
        } else {
          obj[j]= 1
        }
      }
    }
    return obj
  }

  function createMoods (obj) {
    let arr = [];
    for (let i in obj) {
      let newobj = {}
      let j = [i].map(mood => mood.charAt(0).toUpperCase() + mood.slice(1))
      newobj.mood = j.join('')
      newobj.value = obj[i]
      arr.push(newobj)
    }
    return arr;
  }

  function topFive (arr, num) {
    let newArr= [];
    let max = num;
    for (let i =0; i < max; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  }

  function randomNumGen (arr, min, max) {
    let copyArr = arr.slice()
    max = Math.floor(max-1);
    let newArr = [];
    for (let i = 0; i < arr.length; i++){
      const choose = Math.floor(Math.random() * (max - min + 1)) + min;
      newArr.push(copyArr.splice(choose,1)[0])
      max-- 
    }
    return newArr
  }

  const moodsObject = create(moodsData)
  const moods = createMoods(moodsObject)
  const sortedMoods = _.orderBy(moods, ['value'], ['desc'])
  const topMoods = topFive(sortedMoods, moodsToShow)
  const randomTopMoods = randomNumGen(topMoods, 0, moodsToShow)
  console.log(randomTopMoods)

  return (
    <View style={styles.container}>
      <BoldAppText style={{color: colors.lightGray, marginBottom:0, fontSize:14, alignSelf:'flex-start',}}>Top 5 Moods</BoldAppText>
      <VictoryGroup width={300} height={200} styles={styles.container}>
        <VictoryScatter
        data={randomTopMoods}
        domainPadding={{ x: [-5,-5] }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        x={"mood"} 
        y={"value"}
        bubbleProperty="value"
        maxBubbleSize={40}
        minBubbleSize={10}
        style={{ 
          data: { 
            fill: colors.cosmicLatte,
            stroke: 'white',
            strokeWidth: 2,
            opacity: 0.8,
          },
          parent: {
          },
          labels: { 
            fill: colors.darkGrayFont, 
            fontSize: 10,
            color: colors.green,
          }
        }}
        interpolation="natural"
        labels={({ datum }) => `${datum.mood}`}
        />

      </VictoryGroup>
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


export default MoodVisuals;