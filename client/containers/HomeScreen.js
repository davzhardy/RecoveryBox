import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Moods from '../components/Moods'
import Meetings from '../components/Meetings'
import SuggestionsList from '../components/SuggestionsList'
import Footer from '../components/Footer'
import InspirationalQuote from '../components/InspirationalQuote'
import ApiService from '../ApiService'
import Loader from '../components/Loader';
import { AppLoading } from 'expo'
import {useDispatch, useSelector } from "react-redux";
import {DateTime} from 'luxon';
import colors from '../styles/colors'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './CalendarScreen'
import { MediumAppText, BoldAppText } from '../styles/text'


function HomeScreen ({ route }) {

  const dispatch = useDispatch();
  useEffect(() => {
    ApiService.getQuote()
    .then(quote => 
      dispatch({
        type: "UPDATE_QUOTE",
        payload: quote
      })
    )
    dispatch({
      type: "UPDATE_ROUTE",
      payload: route.name,
    })
  },[])
  
  const quoteItem = useSelector((state) => state.dailyQuote.todaysQuote);

  const fullHistoricalInfo = useSelector((state) => state.historicalData);
  const dailyInfo = useSelector((state) => state.dailyInfo);
  const todaysDate = useSelector((state) => state.helper.now);
  const userId = useSelector((state) => state.user.id);
  const dayRegistered = useSelector((state) => state.helper.dayRegistered);

  function clickHandler (arg) {
    arg.date = DateTime.fromMillis(todaysDate).toUTC().startOf('day').ts
    createDailyData(arg)
    dispatch({
      type: "UPDATE_HISTORICALDATA_WITH_DAILYINFO",
      payload: arg
    })
    dispatch({
      type: "UPDATE_DAY",
      payload: true
    })
    dispatch({
      type: "REGISTER_MODAL",
      payload: true
    })
  }

  function createDailyData (dailyData) {
    ApiService.postDailyData( {
      date: dailyData.date,
      meetings: dailyData.meetings,
      feeling: dailyData.feeling,
      moods: JSON.stringify(dailyData.moods),
      suggestions: JSON.stringify(dailyData.suggestions),
      UserId: userId,
    })
  };

  const registerModalVisible = useSelector((state) => state.helper.registerModal);

// TODO refactor to have modal as seperate component

  return (
    !quoteItem ? 
    <Loader/>
    :
    <View style={styles.container}>        
      <ScrollView>
      <View style={styles.wrapperZero}>
        <HomeWelcome/>
        <InspirationalQuote quote={quoteItem[0].q} author={quoteItem[0].a}/>
      </View>
      <View style={styles.wrapperOne}> 
        <Meetings/>
      </View>
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
          <BoldAppText style={{fontSize: 14, color: colors.cosmicLatte, marginBottom:0,}}>{dayRegistered ? 'AMEND YOUR DAY' : 'REGISTER YOUR DAY'}</BoldAppText>
        </TouchableOpacity>
      </View>
      <Modal visible={registerModalVisible} animationType={"slide"} transparent={true}>
        <View style={styles.modalWrapper}>
          <MediumAppText style={{color:'white'}}>
            DAY REGISTERED
          </MediumAppText>
          <TouchableOpacity style={styles.return} onPress={() => {
            dispatch({
              type: "REGISTER_MODAL",
              payload: false
            })
          }}>
          <Image style={styles.image} source={require('../assets/close.png')}/>
        </TouchableOpacity>
        </View>
        
      </Modal>
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
    width: '50%',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  wrapperZero: {
    flexDirection: 'column',
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
  modalWrapper: {
    position: 'absolute',
    left: 90,
    top: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: 175,
    width: 200,
    backgroundColor: colors.orange,
    opacity: 0.95,
    elevation: 15,
    borderRadius: 5,
  },
  return: {
    marginTop: 20,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 15,
    width: 15,
  },

});



export default HomeScreen;