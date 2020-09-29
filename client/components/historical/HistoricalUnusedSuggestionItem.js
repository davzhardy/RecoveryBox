import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import _ from 'lodash'
import {useDispatch, useSelector } from "react-redux";
import {DateTime} from 'luxon'
import colors from '../../styles/colors'
import { MediumAppText, BoldAppText } from '../../styles/text'

function HistoricalUnusedSuggesitonItem ({ onSuggestionAdd, suggestion }) {
  
  return (
    <View key={suggestion} style={{flexDirection:'row', alignItems:'center', justifyContent: 'space-between'}}>
    <MediumAppText key={suggestion} style={{marginTop: -10, marginRight: 10, fontSize: 12}}>{suggestion}</MediumAppText>
    <TouchableOpacity style={[styles.removeIcon, {backgroundColor: colors.green}]} onPress={()=>onSuggestionAdd()}>
      <Image style={styles.add} source={require('../../assets/add.png')}/>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  add: {
    height: 9,
    width: 9,
  },
  removeIcon: {
    backgroundColor: colors.lightGray,
    opacity: 1,
    width: 12,
    height: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: -15,
  },
});


export default HistoricalUnusedSuggesitonItem;