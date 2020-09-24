import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../../styles/text'
import Divider from '../Divider'
import { VictoryScatter, VictoryGroup, VictoryChart, VictoryAxis } from 'victory-native';
import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop } from "react-native-svg";

function MoodVisuals () {

  const moodsToShow = 5;
  // TODO make the number of moods you show customisable

  const historicalData = useSelector((state) => state.historicalData);
  const moodsData = _.map(historicalData, el => el.moods) 
  
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
      newobj.mood = i
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

  return (
    <View style={styles.container}>
      <BoldAppText>Your moods for the past [week]</BoldAppText>
      <VictoryGroup width={350} height={200} >
        <VictoryScatter
        data={randomTopMoods} 
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        x={"mood"} 
        y={"value"}
        bubbleProperty="value"
        maxBubbleSize={40}
        minBubbleSize={5}
        style={{ 
          data: { fill: 'url(#gradient1)' },
          labels: { fill: "#2A2A30", fontSize: 12}
        }}
        interpolation="natural"
        labels={({ datum }) => `${datum.mood}`}
        />
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
      </VictoryGroup>
    
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});

export default MoodVisuals;