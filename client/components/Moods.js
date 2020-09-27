import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity, TextInput } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import {Picker} from '@react-native-community/picker';
import Divider from './Divider'
import { delay } from 'lodash';

function Moods () {
 
  const Item = Picker.Item;

  const dispatch = useDispatch()
  const [stateOne, setStateOne] = useState(false)
  const [stateTwo, setStateTwo] = useState(false)
  const [stateThree, setStateThree] = useState(false)
  const currentMoods = useSelector((state) => state.dailyInfo.moods)

  const moodAggregator = [stateOne, stateTwo, stateThree]

  function submitHandler (arg) {
    const moodsFilter = arg.filter(mood => mood !== false)
    let moodsLowercase = [];
    moodsFilter.forEach(mood => moodsLowercase.push(mood.toLowerCase()))
    const moods = moodsLowercase.filter(mood => !currentMoods.includes(mood))
    dispatch({
      type: 'UPDATE_MOODS',
      payload: moods
    })
  }

  // const [animationValue, setAnimationValue] = useState(0)
  // const [animationValue1, setAnimationValue1] = useState(0)
  // const [animationValue2, setAnimationValue2] = useState(0)
  // const [animationValue3, setAnimationValue3] = useState(0)
  // const [animationValue4, setAnimationValue4] = useState(0)
  // const [animationValue5, setAnimationValue5] = useState(0)
  // const [animationValue6, setAnimationValue6] = useState(0)

  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));
  const [animationValue1, setAnimationValue1] = useState(new Animated.Value(0));
  const [animationValue2, setAnimationValue2] = useState(new Animated.Value(0));
  const [animationValue3, setAnimationValue3] = useState(new Animated.Value(0));
  const [animationValue4, setAnimationValue4] = useState(new Animated.Value(0));
  const [animationValue5, setAnimationValue5] = useState(new Animated.Value(0));
  const [animationValue6, setAnimationValue6] = useState(new Animated.Value(0));

//TODO refactor the loop to use animation.loop

  useEffect(() => {
    fadeIn(animationValue, 5000, 4000, 2000)
    setInterval(()=>fadeIn(animationValue, 5000, 4000, 2000), 11000)
    fadeIn(animationValue1, 6000, 5000, 0)
    setInterval(()=>fadeIn(animationValue1, 6000, 5000, 0), 11000)
    fadeIn(animationValue2, 6000, 5000, 3000)
    setInterval(()=>fadeIn(animationValue2, 6000, 5000, 1000), 14000)
    fadeIn(animationValue3, 4000, 4000, 5000)
    setInterval(()=>fadeIn(animationValue3, 4000, 4000, 0), 13000)
    fadeIn(animationValue4, 3000, 6000, 1500)
    setInterval(()=>fadeIn(animationValue4, 3000, 6000, 1000), 10500)
    fadeIn(animationValue5, 1000, 9000, 2000)
    setInterval(()=>fadeIn(animationValue5, 1000, 9000, 500), 12000)
    fadeIn(animationValue6, 2000, 9000, 4000)
    setInterval(()=>fadeIn(animationValue6, 2000, 9000, 1000), 15000)
  });

  function fadeIn (value, duration1, duration2, delay1) {
    Animated.timing(value, {
      toValue: 1,
      duration: duration1,
      delay: delay1,
      useNativeDriver: true,
    }).start(() => fadeOut(value, duration2))
  }

  function fadeOut (value, duration) {
    Animated.timing(value, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start() 
  }

  return (
    <View style={styles.container}>
      <View>
        <BoldAppText>My moods</BoldAppText>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.leftWrapper}>
          <View style={styles.wrapper}>
            <MediumAppText>Are you feeling good?</MediumAppText>
            <Picker
              selectedValue={stateOne}
              style={styles.picker}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
              setStateOne(itemValue)
            }>
              <Item label="Select a mood..." value='' />
              <Item label="Happy" value="Happy" />
              <Item label="Positive" value="Positive" />
              <Item label="Energetic" value="Energetic" />
              <Item label="Calm" value="Calm" />
            </Picker>
          </View>
          <View style={styles.wrapper}>
            <MediumAppText>Or are things a little bit tough?</MediumAppText>
            <Picker
              selectedValue={stateTwo}
              style={styles.picker}
              mode="dropdown"
              onValueChange={(v, itemIndex) =>
              setStateTwo(v)
            }>
              <Item label="Select a mood..." value='' />
              <Item label="Anxious" value="Anxious" />
              <Item label="Worried" value="Worried" />
              <Item label="Stressed" value="Stressed" />
            </Picker>
          </View>
          <View style={styles.wrapper}>
            <MediumAppText>You can input any other moods here...</MediumAppText>
            <TextInput
              placeholder='Enter a mood'
              value= {stateThree ? stateThree : ''}
              onChangeText={text => setStateThree(text)}
            />
          </View>
          <View style={styles.wrapper}>
          <TouchableOpacity style={styles.button} onPress={() => submitHandler(moodAggregator)}>
            <MediumAppText>Register your moods for today</MediumAppText>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightWrapper}>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue}]}>Calm</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue1}]}>Joyful</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue2}]}>Relaxed</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue3}]}>Peaceful</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue4}]}>Energised</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue5}]}>Content</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue6}]}>Happy</Animated.Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  leftWrapper: {
    flex: 3,
    flexDirection: 'column',
  },
  rightWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  picker: {
    height: 50,
    width: 150,
    borderColor: '#FFF4E4',
    borderWidth: 1,              
  },
  button: {
    width: '20%',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: '#ADF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default Moods;