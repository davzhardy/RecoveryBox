import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import Divider from './Divider'
import { delay } from 'lodash';
import colors from '../styles/colors';

function Moods () {
 
  const dispatch = useDispatch()
  const [stateOne, setStateOne] = useState('')
  const [stateTwo, setStateTwo] = useState('')
  const [stateThree, setStateThree] = useState('')
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
    setModalVisible(true)
  }

  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));
  const [animationValue1, setAnimationValue1] = useState(new Animated.Value(0));
  const [animationValue2, setAnimationValue2] = useState(new Animated.Value(0));
  const [animationValue3, setAnimationValue3] = useState(new Animated.Value(0));
  const [animationValue4, setAnimationValue4] = useState(new Animated.Value(0));
  const [animationValue5, setAnimationValue5] = useState(new Animated.Value(0));
  const [animationValue6, setAnimationValue6] = useState(new Animated.Value(0));

//TODO refactor the loop to use animation.loop

  useEffect(() => {
    fadeIn(animationValue, 1500, 8500, 1000)
    setInterval(()=>fadeIn(animationValue, 1500, 8500, 1000), 11000)
    fadeIn(animationValue1, 6000, 5000, 0)
    setInterval(()=>fadeIn(animationValue1, 6000, 5000, 0), 12000)
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

  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View>
      <MediumAppText style={{color: colors.darkGrayFont}}>MY MOODS</MediumAppText>
      </View>
      
      <View style={styles.contentWrapper}>
        <View style={styles.leftWrapper}>
          <View style={styles.wrapper}>
            <MediumAppText>Are you feeling good?</MediumAppText>
            <MediumAppText>Or are things a little difficult?</MediumAppText>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter a mood'
              value= {stateOne ? stateOne : ''}
              onChangeText={text => setStateOne(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Enter a mood'
              value= {stateTwo ? stateTwo : ''}
              onChangeText={text => setStateTwo(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Enter a mood'
              value= {stateThree ? stateThree : ''}
              onChangeText={text => setStateThree(text)}
            />
          </View>
        </View>
        <View style={styles.rightWrapper}>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue}]}>Calm</Animated.Text>
            <Animated.Text style={[styles.animatedText1, {opacity:animationValue1}]}>Joyful</Animated.Text>
            <Animated.Text style={[styles.animatedText2, {opacity:animationValue2}]}>Relaxed</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue3}]}>Peacefull</Animated.Text>
            <Animated.Text style={[styles.animatedText3, {opacity:animationValue4}]}>Energised</Animated.Text>
            <Animated.Text style={[styles.animatedText1, {opacity:animationValue5}]}>Content</Animated.Text>
            <Animated.Text style={[styles.animatedText, {opacity:animationValue6}]}>Happy</Animated.Text>
        </View>
      </View>
      <View >
      <Modal visible={modalVisible} animationType={"slide"} transparent={true}>
        <View style={styles.modalWrapper}>
          <MediumAppText>
            MOODS UPDATED
          </MediumAppText>
          <TouchableOpacity style={styles.return} onPress={() => {
              setModalVisible(false)
            }}>
          <Image style={styles.image} source={require('../assets/close.png')}/>
        </TouchableOpacity>
        </View>
        
      </Modal>
        <TouchableOpacity style={styles.button} onPress={() => submitHandler(moodAggregator)}>
          <MediumAppText style={{marginBottom: 0}}>Update your moods</MediumAppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//TODO rework modal dimensions so that they are based on screen size

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.darkGrayFont, 
    fontSize: 12,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  leftWrapper: {
    flex: 2,
    height: '100%',
    flexDirection: 'column',
  },
  rightWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between' 
  },
  wrapper: {
    paddingLeft: 5,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderRadius:5,
    height:40,
    paddingLeft: 5,
    marginTop:5,
    width: '80%',
    fontSize: 10,
    fontFamily: 'Montserrat_500Medium',
    borderBottomWidth: 1,
    borderBottomColor: colors.cosmicLatte,
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 20,
    left: 0,
    bottom: 10,
    backgroundColor: colors.cosmicLatte,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedText: {
    color: colors.blue,
    fontFamily: 'Montserrat_500Medium',
    marginVertical: 7,
    fontSize: 11,
    marginLeft: 20,
  },
  animatedText1: {
    color: colors.green,
    fontFamily: 'Montserrat_500Medium',
    marginVertical: 7,
    fontSize: 11,
    marginLeft: 0,
  },
  animatedText2: {
    color: colors.blue,
    fontFamily: 'Montserrat_500Medium',
    marginVertical: 7,
    fontSize: 11,
    marginLeft: 40,
  },
  animatedText3: {
    color: colors.blue,
    fontFamily: 'Montserrat_500Medium',
    marginVertical: 7,
    fontSize: 11,
    marginLeft: 10,
  },
  modalWrapper: {
    position: 'absolute',
    left: 90,
    top: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: 90,
    width: 200,
    backgroundColor: colors.cosmicLatte,
    opacity: 0.95,
    elevation: 9,
    borderRadius: 5,
  },
  return: {
    marginTop: 20,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 15,
    width: 15,
  },
});



export default Moods;