import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Moods from '../components/Moods'
import Meetings from '../components/Meetings'
import SuggestionsList from '../components/SuggestionsList'
import InspirationalQuote from '../components/InspirationalQuote'
import ApiService from '../ApiService'
import { AppLoading } from 'expo';
import {useDispatch, useSelector } from "react-redux";
import {DateTime} from 'luxon';

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

  const fullHistoricalInfo = useSelector((state) => state.historicalData);
  const dailyInfo = useSelector((state) => state.dailyInfo);
  const todaysDate = useSelector((state) => state.helper.now);

  function clickHandler (arg) {
    arg.date = DateTime.fromMillis(todaysDate).toUTC().startOf('day').ts
    dispatch({
      type: "UPDATE_HISTORICALDATA_WITH_DAILYINFO",
      payload: arg
    })
    console.log(fullHistoricalInfo)
  }

  return (
    !quoteItem ?
    <AppLoading/>
    :
    <View style={styles.container}>
      <HomeWelcome/>
      <InspirationalQuote quote={quoteItem[0].q} author={quoteItem[0].a}/>
      <Meetings/>
      <Feeling/>
      <SuggestionsList/>
      <Moods/>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={() => clickHandler(dailyInfo)}>
          <Text>Submit your data for the day</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: '20%',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: '#FFF4E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center',
    marginTop: 5,
  },

});



export default HomeScreen;