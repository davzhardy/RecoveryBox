import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { MediumAppText } from '../styles/text'
import Divider from '../components/Divider'
import Slider from '@react-native-community/slider';

function Feeling () {

  return (
    <View style={styles.container}>
      <MediumAppText style={{fontSize: 16}}>How are you feeling today?</MediumAppText>
      <Slider
    style={{width: 200, height: 40}}
    minimumValue={0}
    maximumValue={1}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
  />
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});



export default Feeling;