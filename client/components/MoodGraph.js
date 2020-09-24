import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../styles/text'
import Divider from '../components/Divider'

function MoodGraph () {

  return (
    <View style={styles.container}>
      <MediumAppText>Hello</MediumAppText>
      <BoldAppText>MoodGraph</BoldAppText>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});



export default MoodGraph;