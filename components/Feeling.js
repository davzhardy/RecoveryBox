import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { MediumAppText } from '../styles/text'
import Divider from '../components/Divider'


function Feeling () {

  return (
    <View style={styles.container}>
      <MediumAppText style={{fontSize: 16}}>How are you feeling today?</MediumAppText>
      <Text>Placeholder for gesture panhandler</Text>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});



export default Feeling;