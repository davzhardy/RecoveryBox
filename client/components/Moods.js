import React, { useState } from 'react';
import { StyleSheet, View, Animated, Text, TouchableOpacity, TextInput } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import {Picker} from '@react-native-community/picker';
import Divider from './Divider'

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
            <Animated.Text style={styles.animatedText}>Calm</Animated.Text>
            <Animated.Text style={styles.animatedText}>Joyful</Animated.Text>
            <Animated.Text style={styles.animatedText}>Relaxed</Animated.Text>
            <Animated.Text style={styles.animatedText}>Peaceful</Animated.Text>
            <Animated.Text style={styles.animatedText}>Energised</Animated.Text>
            <Animated.Text style={styles.animatedText}>Content</Animated.Text>
            <Animated.Text style={styles.animatedText}>Happy</Animated.Text>
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