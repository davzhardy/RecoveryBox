import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
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
      <BoldAppText>Select a set of moods for today</BoldAppText>
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
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '20%',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: '#ADF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60%',
  },
  picker: {
    height: 50,
    width: 150,
    borderColor: '#FFF4E4',
    borderWidth: 1,

  },
});



export default Moods;