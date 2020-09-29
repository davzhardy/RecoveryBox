import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, View, Text, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../styles/text'
import Divider from '../components/Divider'

function InpsirationalQuote ({ quote, author }) {

  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));
  function fadeIn (value, duration1, delay1) {
    Animated.timing(value, {
      toValue: 1,
      duration: duration1,
      delay: delay1,
      useNativeDriver: true,
    }).start()
  }

  function fadeOut (value, duration) {
    Animated.timing(value, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start() 
  }

  useEffect(() => {
    fadeIn(animationValue, 1500, 0)},[])

  return (
    <Animated.View style={[styles.container, {opacity:animationValue}]}>
      <MediumAppText style={styles.quote}>{quote}</MediumAppText>
      <BoldAppText style={styles.author}>{author}</BoldAppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  quote: {
    marginBottom: 5,
  },
  author: {
    fontSize: 17,
  },
});



export default InpsirationalQuote;