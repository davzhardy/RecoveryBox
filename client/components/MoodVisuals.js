import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../styles/text'
import Divider from './Divider'
import { VictoryScatter, VictoryChart, VictoryAxis } from 'victory-native';
import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop } from "react-native-svg";

function MoodVisuals () {

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

// make this top 5 only

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

  function topFive (arr) {
    let newArr= [];
    let max = 5;
    for (let i =0; i < max; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  }

  const moodsObject = create(moodsData)
  const moods = createMoods(moodsObject)
  const sortedMoods = _.orderBy(moods, ['value'], ['desc'])
  const topMoods = topFive(sortedMoods)

  // TODO Randomise topmoods so they appear in different positions each time
  // TODO Put the circle in its own component and import it
  // TODO Make the circle more interesting



  return (
    <View style={styles.container}>
      <BoldAppText>Your moods for the past [week]</BoldAppText>
      <VictoryChart width={350} >
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
        <VictoryScatter
        data={topMoods} 
        x={"mood"} 
        y={"value"}
        bubbleProperty="value"
        maxBubbleSize={25}
        minBubbleSize={5}
        style={{ 
          data: { fill: 'url(#gradient1)' },
          labels: { fill: "#2A2A30", fontSize: 12}
          }}
        interpolation="natural"
        labels={({ datum }) => `${datum.mood}`}
        />
        <VictoryAxis
          tickCount={0}
        />
        <VictoryAxis dependentAxis
          style={{
            axis: {stroke: '#DFE2E2', opacity: 0.5},
            tickLabels: {fontsize:5, color: 'blue'},
          }}
          tickCount={2}
        />
      </VictoryChart>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});



export default MoodVisuals;