//https://formidable.com/open-source/victory/gallery/area-hover-styles

import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../../styles/text'
import Divider from '../Divider'
import { VictoryArea, VictoryStack, VictoryGroup } from './Victory';

import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop } from "react-native-svg";

function SuggestionsVisuals () {

  const suggestionsToShow = 5;
  const historicalData = useSelector((state) => state.historicalData);
  const suggestionsData = _.map(historicalData, el => el.suggestions) 
  const fullSuggestionsList = useSelector((state) => state.settings.suggestionSettings.fullSuggestionsList);
  
  // TODO add some kind of toggle to show more data on the graphs or change their format

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

  const suggestionsObject = create(suggestionsData)
  const suggestions = createSuggestions(suggestionsObject)
  const sortedSuggestions = _.orderBy(suggestions, ['value'], ['desc'])
  const topSuggestions = topFive(sortedSuggestions, suggestionsToShow)
  const randomTopSuggestions = randomNumGen(topSuggestions, 0, suggestionsToShow)

  return (
    <View style={styles.container}>
      <BoldAppText>Your top suggesitons this [week]</BoldAppText>
      <VictoryGroup width={350} >
        <VictoryStack>
        <VictoryArea 
        data={randomTopSuggestions} 
        x="suggestion" 
        y="value"
        style={{ 
          data: { fill: 'url(#gradient1)' },
          parent: {}
          }}
        interpolation="natural"
        />
        </VictoryStack>
      </VictoryGroup>
      <Defs>
            <LinearGradient id="gradient1"
              x1="0%" 
              y1="0%" 
              x2="25%"
              x3="100%" 
              y2="100%"
            >
              <Stop offset="0%" stopColor='#FF55B8'/>
              <Stop offset="100%" stopColor='#FF8787'/>
            </LinearGradient>
          </Defs>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});

export default SuggestionsVisuals;