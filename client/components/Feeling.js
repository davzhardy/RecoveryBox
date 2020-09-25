import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { MediumAppText } from '../styles/text'
import Divider from '../components/Divider'
import Slider from '@react-native-community/slider';

function Feeling () {

  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(false)
  const sliderCompletionValue = useSelector((state) => state.dailyInfo.feeling)
  function handleSliderCompletion (arg) {
    dispatch({
      type: "UPDATE_FEELING",
      payload: arg
    })
  }

  return (
    <View style={styles.container}>
      <MediumAppText style={{fontSize: 16}}>How are you feeling today?</MediumAppText>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        step={1}
        maximumValue={10}
        onValueChange={value => setSliderValue(value)}
        onSlidingComplete={value => handleSliderCompletion(value)}
        minimumTrackTintColor="red"
        maximumTrackTintColor="#000000"
      />
      <Text>{sliderValue}</Text>
      <Text>{sliderCompletionValue}</Text>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default Feeling;