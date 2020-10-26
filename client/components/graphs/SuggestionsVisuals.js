import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../../styles/text'
import Divider from '../Divider'
import { VictoryArea, VictoryScatter, VictoryGroup, VictoryChart, VictoryBar} from './Victory';
import colors from '../../styles/colors'
import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop } from "react-native-svg";

function SuggestionsVisuals () {

  const suggestionsToShow = 5;

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
  const suggestionsData = _.map(periodData, el => el.suggestions) 
  const fullSuggestionsList = useSelector((state) => state.settings.suggestionSettings.fullSuggestionsList);

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

  function createSuggestions (obj) {
    let arr = [];
    for (let i in obj) {
      let newobj = {}
      newobj.suggestion = i
      newobj.value = obj[i]
      arr.push(newobj)
    }
    return arr;
  }

  function topFive (arr, num) {
    let newArr= [];
    let max = Math.min(num, arr.length);
    for (let i =0; i < max; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  }

  function randomNumGen (arr, min, max) {
    let copyArr = arr.slice()
    max = Math.min(Math.floor(max-1), arr.length-1);
    let newArr = [];
    for (let i = 0; i < arr.length; i++){
      const choose = Math.floor(Math.random() * (max - min + 1)) + min;
      newArr.push(copyArr.splice(choose,1)[0])
      max-- 
    }
    return newArr
  }

  const suggestionsObject = create(suggestionsData)
  const suggestions = createSuggestions(suggestionsObject)
  const sortedSuggestions = _.orderBy(suggestions, ['value'], ['desc'])
  const topSuggestions = topFive(sortedSuggestions, suggestionsToShow)
  const randomTopSuggestions = randomNumGen(topSuggestions, 0, suggestionsToShow)

  if (suggestionsData.length) {
    return (
      <View style={styles.container}>
        <BoldAppText style={{color: colors.lightGray, marginBottom:0, fontSize:14, alignSelf:'flex-start',}}>Top 5 Suggestions</BoldAppText>
        <VictoryGroup width={300} height={200} styles={styles.container} >
          <VictoryScatter 
            domainPadding={{ x: [-5,-5] }}
            data={randomTopSuggestions} 
            animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          x={"suggestion"} 
          y={"value"}
          bubbleProperty="value"
          maxBubbleSize={40}
          minBubbleSize={10}
          style={{ 
            data: { 
              fill: colors.blue,
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
          labels={({ datum }) => `${datum.suggestion}`}
          />

        </VictoryGroup>
      </View>
    );
  } else {
    return (
      <MediumAppText>Please add some data to display this chart</MediumAppText>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default SuggestionsVisuals;