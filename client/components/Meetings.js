import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { MediumAppText, BoldAppText } from '../styles/text'
import Divider from '../components/Divider'


function Meetings () {

  const dispatch = useDispatch();
  
  const meetings = useSelector((state) => state.dailyInfo.meetings); 
  const onPlus = () => dispatch({type: 'INCREMENT_DAILY_MEETINGS'});
  const onMinus = () => {
    if (meetings===0) 
    return;
    dispatch({type: 'DECREMENT_DAILY_MEETINGS'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <TouchableOpacity style={styles.button} onPress={onMinus}>
          <Text style={{color: '#FF61AB', fontSize: 25, fontWeight: '700'}}>-</Text>
        </TouchableOpacity>
        <MediumAppText style={{color: "#2A2A30", fontSize: 22}}>My Meetings</MediumAppText>
        <TouchableOpacity style={styles.button} onPress={onPlus}>
          <Text style={{color: '#FF61AB', fontSize: 25, fontWeight: '600'}}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.infocontainer}>
          <BoldAppText style={{fontSize: 18, marginRight: 10}}>{meetings}</BoldAppText>
          <MediumAppText style={{color: '#BBBCCD'}} >MEETINGS TODAY</MediumAppText>
        </View>
      </View>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: "#DDDDE6",
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  infocontainer: {
    width: '80%',
    marginLeft: 100,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  }, 
});


export default Meetings;