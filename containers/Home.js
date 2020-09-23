import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { BoldAppText, MediumAppText } from '../styles/text'
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Meetings from '../components/Meetings'

function HomeScreen () {

  return (
    <View style={styles.container}>
      <HomeWelcome/>
      <Feeling/>
      <Meetings/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },

});



export default HomeScreen;