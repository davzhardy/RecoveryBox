import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../styles/text'
import Divider from './Divider'
import { VictoryArea, VictoryChart, VictoryAxis } from 'victory-native';
import _ from 'lodash';
import { DateTime } from 'luxon'
import {Defs, LinearGradient, Stop } from "react-native-svg";


function FeelingGraph () {

  const historicalData = useSelector((state) => state.historicalData);
  const feelingData = _.map(historicalData, el => el.feeling) 
  const dateData = _.map(historicalData, el => el.date)
  const formattedDateData = dateData.map(date => DateTime.fromMillis(date).toFormat('LLL dd'))
  
  function create(array1, array2) {
    let list = [];
    let count = 0;
    for (let i of array1) {
      let obj = {}
      obj.date = i
      obj.feeling = array2[count]
      list.push(obj)
      count++
    }
    return list
  }

  const combinedList = create(formattedDateData, feelingData)

  return (
    <View style={styles.container}>
      <BoldAppText>Your contentment level for a [week]</BoldAppText>
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
        <VictoryArea 
        data={combinedList} 
        x="date" 
        y="feeling"
        style={{ 
          data: { fill: 'url(#gradient1)' },
          parent: {}
          }}
        interpolation="natural"
        />
        <VictoryAxis
          tickCount={3}
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



export default FeelingGraph;