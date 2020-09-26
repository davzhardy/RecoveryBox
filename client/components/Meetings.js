import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { MediumAppText, BoldAppText } from '../styles/text'
import Divider from '../components/Divider'
import colors from '../styles/colors'
import _ from 'lodash'

function Meetings () {

  const dispatch = useDispatch();
  
  const meetings = useSelector((state) => state.dailyInfo.meetings); 
  const onPlus = () => dispatch({type: 'INCREMENT_DAILY_MEETINGS'});
  const onMinus = () => {
    if (meetings===0) 
    return;
    dispatch({type: 'DECREMENT_DAILY_MEETINGS'});
  };

  //TODO put in a reducer as this info is used on multiple screens
  // const historicalData = useSelector((state) => state.historicalData);
  // const meetingsData = _.map(historicalData, el => el.meetings) 

  // function meetingsReducer (arr) {
  //   const copyArr = arr.slice(0) 
  //   const number = copyArr.reduce((acc, value) => acc + value)
  //   return number
  // } 

  // const totalMeetings = meetingsReducer(meetingsData)

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <TouchableOpacity style={styles.button} onPress={onMinus}>
          <Image source={require('../assets/remove.png')}/>
        </TouchableOpacity>
        <BoldAppText style={{fontSize: 18}}>Meetings</BoldAppText>
        <TouchableOpacity style={styles.button} onPress={onPlus}>
        <Image source={require('../assets/add.png')}/>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.infocontainer}>
          <View tyle={styles.infowrapper}>
            <BoldAppText style={styles.number}>{meetings}</BoldAppText>
            <MediumAppText style={styles.text}>MEETINGS TODAY</MediumAppText>
          </View>
          <View>
            <BoldAppText style={styles.number}>10</BoldAppText>
            <MediumAppText style={styles.text}>TOTAL MEETINGS</MediumAppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topcontainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: colors.blue,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  infocontainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around'
  }, 
  infowrapper: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  number: {
    fontSize: 16,
    marginRight: 5,
  },
  text: {
    fontSize: 10,
  },
});


export default Meetings;