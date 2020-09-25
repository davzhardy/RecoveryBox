import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { MediumAppText, BoldAppText } from '../styles/text'
import Divider from '../components/Divider'

function InpsirationalQuote ({ quote, author }) {

  return (
    <View style={styles.container}>
      <MediumAppText>{quote}</MediumAppText>
      <BoldAppText>{author}</BoldAppText>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});



export default InpsirationalQuote;