import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import colors from '../styles/colors'

function Loader () {

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

  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));
  const [animationValue1, setAnimationValue1] = useState(new Animated.Value(0));
  const [animationValue2, setAnimationValue2] = useState(new Animated.Value(0));

  useEffect(() => {
    fadeIn(animationValue, 500, 500, 0)
    setInterval(()=>fadeIn(animationValue, 500, 500, 0), 1000)
    fadeIn(animationValue1, 500, 500, 100)
    setInterval(()=>fadeIn(animationValue1, 500, 500, 0), 1100)
    fadeIn(animationValue2, 500, 500, 200)
    setInterval(()=>fadeIn(animationValue2, 500, 500, 0), 1200)
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedview0, {opacity:animationValue}]}/>
      <Animated.View style={[styles.animatedview1, {opacity:animationValue1}]}/>
      <Animated.View style={[styles.animatedview2, {opacity:animationValue2}]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.platinum,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  animatedview0: {
    borderRadius: 50,
    height: 11,
    width: 11,
    backgroundColor: colors.blue,
    marginRight: 8,
  },
  animatedview1: {
    borderRadius: 50,
    height: 11,
    width: 11,
    backgroundColor: colors.green,
    marginRight: 8,
  },
  animatedview2: {
    borderRadius: 50,
    height: 11,
    width: 11,
    backgroundColor: colors.orange,
    marginRight: 8,
  }
});

export default Loader;