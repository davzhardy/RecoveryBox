import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Moods from '../components/Moods'
import Meetings from '../components/Meetings'
import SuggestionsList from '../components/SuggestionsList'
import Footer from '../components/Footer'
import InspirationalQuote from '../components/InspirationalQuote'
import ApiService from '../ApiService'
import { AppLoading } from 'expo';
import {useDispatch, useSelector } from "react-redux";
import {DateTime} from 'luxon';
import colors from '../styles/colors'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './CalendarScreen'


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
  const userId = useSelector((state) => state.user.id);
  console.log(fullHistoricalInfo)

  function clickHandler (arg) {
    arg.date = DateTime.fromMillis(todaysDate).toUTC().startOf('day').ts
    createDailyData(arg)
    dispatch({
      type: "UPDATE_HISTORICALDATA_WITH_DAILYINFO",
      payload: arg
    })
  }

//TODO refactor the data flow, there must be a better way to do this
  function createDailyData (dailyData) {
    ApiService.postDailyData( {
      date: dailyData.date,
      meetings: dailyData.meetings,
      feeling: dailyData.feeling,
      moods: JSON.stringify(dailyData.moods),
      suggestions: JSON.stringify(dailyData.suggestions),
      UserId: userId,
    })
    .then(data => {
      let objToDispatch = {}

            // dispatch({
      //   type: "UPDATE_HISTORICALDATA_WITH_DAILYINFO",
      //   payload: data
      // })
    })
  };

//TODO make sure the user can only submit the data once, if they try and submit twice it warns them and then it updates the existing information for that date

  const Tab = createBottomTabNavigator();


  return (
    !quoteItem ?
    <AppLoading/>
    :
    <View style={styles.container}>        
      <ScrollView>
      <View style={styles.wrapperZero}>
        <Meetings/>
      </View>
      {/* <InspirationalQuote quote={quoteItem[0].q} author={quoteItem[0].a}/> */}
      <View style={styles.wrapperOne}> 
        <Feeling/>
      </View>
      <View style={styles.wrapperTwo}>
        <SuggestionsList/>
      </View>  
      <View style={styles.wrapperTwo}>
        <Moods/>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={() => clickHandler(dailyInfo)}>
          <Text>Submit your data for the day</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.platinum,
    paddingBottom: 65,
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
  wrapperZero: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  wrapperOne: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
    marginTop: 1,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  wrapperTwo: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 1,
    marginTop: 1,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  wrapper: {
    alignItems: 'center',
    marginTop: 5,
  },

});



export default HomeScreen;