import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import Divider from '../components/Divider'
import Slider from '@react-native-community/slider';
import colors from '../styles/colors'


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

  function handleSliderTouch (value) {
    if (value!== false && value < 4) {
      return <><Image style={styles.selectedicon} source={require('../assets/sad.png')}/><Image style={styles.unselectedicon}  source={require('../assets/neutral.png')}/><Image style={styles.unselectedicon} source={require('../assets/happy.png')}/></>
    } else if (value < 7) { 
      return <><Image style={styles.unselectedicon} source={require('../assets/sad.png')}/><Image style={styles.selectedicon}  source={require('../assets/neutral.png')}/><Image style={styles.unselectedicon} source={require('../assets/happy.png')}/></>
    } else if (value) {
      return <><Image style={styles.unselectedicon} source={require('../assets/sad.png')}/><Image style={styles.unselectedicon}  source={require('../assets/neutral.png')}/><Image style={styles.selectedicon} source={require('../assets/happy.png')}/></>
    } else {
      <></>
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <BoldAppText style={{fontSize: 17}}>How are you feeling?</BoldAppText>
      </View>
      <View style={styles.sliderWrapper}>
        <View style={styles.textWrapper}>
          <MediumAppText>Its been a tough day</MediumAppText>
        </View>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          value={5}
          step={1}
          maximumValue={10}
          onValueChange={value => setSliderValue(value)}
          onSlidingComplete={value => handleSliderCompletion(value)}
          minimumTrackTintColor="#2F80ED"
          maximumTrackTintColor="#DBDBDB"
          thumbTintColor={colors.orange}
        />
        <View style={styles.textWrapper}>
          <MediumAppText  style={{textAlign: 'left'}}>Super awesome</MediumAppText>
        </View>
      </View>
      <View style={styles.iconWrapper}>
        {handleSliderTouch(sliderValue)}
      </View>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  sliderWrapper: {
    marginTop: 10,
    flexDirection: 'row'

  },
  textWrapper: {
    width: 60
  },
  iconWrapper: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
    marginTop: -15,
  },
  selectedicon: {
    opacity: 1,
    width: 30,
    height: 30,
  },
  unselectedicon: {
    opacity: 0,
    width: 30,
    height: 30,
  }

});



export default Feeling;