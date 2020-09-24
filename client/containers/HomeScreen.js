import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Meetings from '../components/Meetings'
import SuggestionsList from '../components/SuggestionsList'
import InspirationalQuote from '../components/InspirationalQuote'
import ApiService from '../ApiService'
import { AppLoading } from 'expo';
import {useDispatch, useSelector } from "react-redux";

function HomeScreen () {

  // TODO:  use react query
  const dispatch = useDispatch();
  useEffect(() => {
    ApiService.getQuote()
    .then(quote => 
      dispatch({
        type: "UPDATE_QUOTE",
        payload: quote
      })
    )
  },[])
  
  const quoteItem = useSelector((state) => state.dailyQuote.todaysQuote);

  return (
    !quoteItem ?
    <AppLoading/>
    :
    <View style={styles.container}>
      <HomeWelcome/>
      <InspirationalQuote quote={quoteItem[0].q} author={quoteItem[0].a}/>
      <Feeling/>
      <Meetings/>
      <SuggestionsList/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },

});



export default HomeScreen;