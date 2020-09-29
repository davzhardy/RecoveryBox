import React from 'react';
import {useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Image, Pressable } from 'react-native';
import colors from '../styles/colors'
import { useNavigation } from '@react-navigation/native';
import { BoldAppText, MediumAppText } from '../styles/text'

function Footer () {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const rootName = useSelector((state) => state.helper.routeName);
  console.log(rootName)

  const home = 'Home'
  const summary = 'Summary'
// TODO add highlights, opacity etc. depending on which navigation state you are in

  function homePress () {
    dispatch({
        type: "UPDATE_ROUTE",
        payload: 'Home',
      })
      navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable style={styles.icon} onPress={() => homePress()}>
          <Image style={styles.icon} source={home===rootName ? require('../assets/homedarkgrey.png') : require('../assets/homelightgrey.png')}/>
        </Pressable>
        <BoldAppText style={home===rootName ? styles.selText : styles.text} onPress={() => homePress()}>Home</BoldAppText>
      </View>
      <View style={styles.wrapper}>
        <Pressable style={styles.icon} onPress={() => navigation.navigate('Summary')}>
          <Image style={styles.icon} source={summary===rootName ? require('../assets/dashboarddarkgrey.png') : require('../assets/dashboardlightgrey.png')}/>
        </Pressable>
        <BoldAppText style={summary===rootName ? styles.selText : styles.text} onPress={() => navigation.navigate('Summary')}>Summary</BoldAppText>
      </View>
      <View style={styles.wrapper}>
        <Pressable onPress={() => navigation.navigate('Calendar')}>
          <Image style={styles.icon} onPress={() => navigation.navigate('Calendar')} source={require('../assets/datelightgrey.png')}/>
        </Pressable>
        <BoldAppText style={styles.text} onPress={() => navigation.navigate('Calendar')}>Calendar</BoldAppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.orange,
    position: 'absolute',
    width: '100%',
    height: 65,
    elevation:2,
    bottom: 0,
    borderTopColor: 'white',
    borderTopWidth: 2,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.cosmicLatte
  },
  selText: {
    fontSize: 16,
    color: colors.darkGrayFont
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default Footer;