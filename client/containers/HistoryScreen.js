import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import _ from 'lodash'
import SuggestionItem from '../components/SuggestionItem'
import {useDispatch, useSelector } from "react-redux";
import {DateTime} from 'luxon'
import colors from '../styles/colors'
import { MediumAppText, BoldAppText } from '../styles/text'
import ApiService from '../ApiService'
import HistoricalMoodItem from '../components/historical/HistoricalMoodItem'
import HistoricalSuggestionItem from '../components/historical/HistoricalSuggestionItem'
import HistoricalUnusedSuggestionItem from '../components/historical/HistoricalUnusedSuggestionItem'
import { useNavigation } from '@react-navigation/native';


function HistoryScreen () {

  //TODO buggy nd broken at the moment, needs to bt split into separate components and put into reducers
  //TODO once the above is completed, need to update the current put request
  const navigation = useNavigation();

  const selectedDate = useSelector((state) => state.helper.selectedDate)
  const fullHistoricalInfo = useSelector((state) => state.historicalData)
  const requiredInfo = _.filter(fullHistoricalInfo, el => el.date === selectedDate)

  const dispatch = useDispatch();

  useEffect(()=>{
    if (requiredInfo.length) dispatch({
      type: "UPDATE_HISTORICAL_FEELING",
      payload: requiredInfo[0].feeling
    })
    if (requiredInfo.length) dispatch({
      type: "UPDATE_HISTORICAL_MEETINGS",
      payload: requiredInfo[0].meetings
    })
    if (requiredInfo.length) dispatch({
      type: "UPDATE_HISTORICAL_MOODS",
      payload: requiredInfo[0].moods.map(mood => mood.charAt(0).toUpperCase() + mood.slice(1))
    }) 
    if (requiredInfo.length) dispatch({
      type: "UPDATE_HISTORICAL_SUGGESTIONS",
      payload: requiredInfo[0].suggestions
    })
    return function cleanup () {
      dispatch({
        type: "UPDATE_HISTORICAL_FEELING",
        payload: 0
    })
    dispatch({
      type: "UPDATE_HISTORICAL_MEETINGS",
      payload: 0
    })
    dispatch({
      type: "UPDATE_HISTORICAL_MOODS",
      payload: []
    })
    dispatch({
      type: "UPDATE_HISTORICAL_SUGGESTIONS",
      payload: []
    })
  }
  },[])

  const feeling = useSelector((state) => state.calendarHistoricalDay.feeling); 
  const meetings = useSelector((state) => state.calendarHistoricalDay.meetings);
  const moodsArr = useSelector((state) => state.calendarHistoricalDay.moods);
  const suggestionsArr = useSelector((state) => state.calendarHistoricalDay.suggestions); 


  function onMeetingsAdd () {
    if (meetings<10)
    dispatch({
      type: "INCREMENT_HISTORICAL_MEETINGS"
    })
  }

  function onMeetingsMinus () { 
    if (meetings>0) 
    dispatch({
      type: "DECREMENT_HISTORICAL_MEETINGS"
    })
    else return
  }

  function onFeelingAdd () { 
    if (feeling<10) {
      dispatch({
        type: "INCREMENT_HISTORICAL_FEELING"
      })
    }
    else return
  }

  function onFeelingMinus () { 
    if (feeling>0) 
    dispatch({
      type: "DECREMENT_HISTORICAL_FEELING"
    })
    else return
  }

  const [newMoods, setNewMoods] = useState('')
  const fullSuggestionsList = useSelector((state) => state.settings.suggestionSettings.suggestionsList);
  const unusedSuggestions = fullSuggestionsList.filter(el => !suggestionsArr.includes(el))
  const historicalInfo = useSelector((state) => state.calendarHistoricalDay);
  function onMoodsRemove () { 

  }

  function onMoodsAdd () { 
    dispatch({
      type: "ADDTO_HISTORICAL_MOODS",
      payload: newMoods
    })
  }

  function onSuggestionRemove () { 
    
  }

  function onSuggestionAdd (name) { 
    dispatch({
      type: "ADDTO_HISTORICAL_SUGGESTIONS",
      payload: name
    })
  }

  const userId = useSelector((state) => state.user.id);

  function createHistoricalData () {
    ApiService.postHistoricalData({
      date: DateTime.fromMillis(selectedDate).toUTC().startOf('day').ts,
      meetings: meetings,
      feeling: feeling,
      moods: JSON.stringify([newMoods]),
      suggestions: JSON.stringify(suggestionsArr),
      UserId: userId,
    })
  }

  function clickHandler () {
    let localObj = historicalInfo
    localObj.date = DateTime.fromMillis(selectedDate).toUTC().startOf('day').ts,
    localObj.moods = [newMoods]
    createHistoricalData()
    dispatch({
      type: "UPDATE_HISTORICALDATA_WITH_HISTORICALINFO",
      payload: localObj
    })
  }

    return (
      <View style={styles.container}>
        <HomeWelcome historicalDate={selectedDate}/>
        {requiredInfo.length ? <></> : <View style={styles.noData}>
            <MediumAppText>You have no data for today.</MediumAppText>
          </View>
        }
      <ScrollView style={styles.infoWrapper}>  
        <View style={styles.infoSubWrapper}>
          <View style={styles.textWrapper}>
            <MediumAppText>Meetings attended:</MediumAppText>
            <BoldAppText style={{marginTop: -10,}}>{meetings}</BoldAppText>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity style={styles.icon} onPress={()=>onMeetingsMinus()}>
              <Image source={require('../assets/remove.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>onMeetingsAdd()}>
              <Image source={require('../assets/add.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoSubWrapper}>
          <View style={styles.textWrapper}>
            <MediumAppText>Feeling:</MediumAppText>
            <View style={{flexDirection:'row'}}>
            <BoldAppText style={{marginTop: -10,}}>{feeling}</BoldAppText>
            <BoldAppText style={{marginTop: -3, fontSize:14}}> / 10</BoldAppText>
            </View>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity style={styles.icon} onPress={()=>onFeelingMinus()}>
              <Image source={require('../assets/remove.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>onFeelingAdd()}>
              <Image source={require('../assets/add.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, minHeight:75}}>
          <MediumAppText style={{marginBottom:15}}>Moods:</MediumAppText>
          {moodsArr.map(
            mood => (
              <HistoricalMoodItem key={mood} onMoodsRemove={onMoodsRemove} mood={mood}/>
            )
          )}
          <TextInput
              style={styles.moodsTextInput}
              placeholder='Enter a mood'
              value={newMoods}
              onChangeText={text => setNewMoods(text)}
            />
        </View>
        <View style={{flex:1, minHeight: 200,}}>
          <View style={styles.cog}>
          <TouchableOpacity onPress={() =>  navigation.navigate('ModifySuggestions')}>
            <Image style={styles.icons} source={require('../assets/settings.png')} />
          </TouchableOpacity>
          </View>
          <View>
            <MediumAppText style={{marginBottom:15, maxWidth:200,}}>Suggestions completed:</MediumAppText>
              {suggestionsArr.map(
                suggestion => (
                  <HistoricalSuggestionItem key={suggestion} onSuggestionRemove={onSuggestionRemove} suggestion={suggestion}/>
                )
              )}
          </View>
          <View style={styles.unusedSuggestionsWrapper}>
            {unusedSuggestions.map(
                suggestion => (
                  <HistoricalUnusedSuggestionItem key={suggestion} name={suggestion} onSuggestionAdd={onSuggestionAdd} />
                )
              )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={() => clickHandler()}>
          <BoldAppText style={{fontSize: 14, color: colors.cosmicLatte, marginBottom:0,}}>UPDATE YOUR DAY</BoldAppText>
        </TouchableOpacity>
      </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.platinum,
  },
  wrapper: {
    alignItems: 'center',
    marginTop: 5,
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
  infoWrapper: {
    flex: 1,
    flexDirection: 'column',
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
  infoSubWrapper: {
    width:'100%',
    flexDirection: 'row',
    alignContent: 'center',
  },
  icon: {
    backgroundColor: colors.blue,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  textWrapper: {
    width: '55%'
  },
  iconWrapper: {
    alignContent: 'center',
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  remove: {
    height: 9,
    width: 9,
  },
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
  moodsTextInput: {
    position:'absolute',
    right: 20,
    backgroundColor: 'transparent',
    borderRadius:5,
    height:40,
    paddingLeft: 5,
    marginTop:5,
    width: '35%',
    fontSize: 10,
    fontFamily: 'Montserrat_500Medium',
    borderBottomWidth: 2,
    borderBottomColor: colors.cosmicLatte,
  },
  moodsTextInput1: {
    position:'absolute',
    left: 0,
    top: 10,
    backgroundColor: 'transparent',
    borderRadius:5,
    height:40,
    paddingLeft: 5,
    marginTop:5,
    width: '35%',
    fontSize: 10,
    fontFamily: 'Montserrat_500Medium',
    borderBottomWidth: 2,
    borderBottomColor: colors.cosmicLatte,
  },
  unusedSuggestionsWrapper: {
    position:'absolute',
    right: 15,
    marginTop:25,
  },
  noData: {
    justifyContent: 'center',
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
  cog: {
    position: 'absolute',
    right: 5,
    top: 0,
    elevation: 5
  },
  icons: {
    height: 15,
    width: 15,
  },
});



export default HistoryScreen;



    // let startingFeeling = 0; 
  // if (requiredInfo.length) startingFeeling = requiredInfo[0].feeling;
  
  // let startingMeetings = 0; 
  // if (requiredInfo.length) startingMeetings = requiredInfo[0].meetings;

  // let startingMoods = []; 
  // if (requiredInfo.length) startingMoods = requiredInfo[0].moods.map(mood => mood.charAt(0).toUpperCase() + mood.slice(1));

  // let startingSuggestions = []; 
  // if (requiredInfo.length) startingSuggestions = requiredInfo[0].suggestions;

  // const [feeling, setFeeling] = useState(startingFeeling)
  // const [meetings, setMeetings ] = useState(startingMeetings)
  // const [moodsArr, setMoods] = useState(startingMoods)
  // const [suggestionsArr, setSuggestions] = useState(startingSuggestions)
  // function onMeetingsAdd () {
  //   setMeetings(meetings+1) 
  // }

  // function onMeetingsMinus () { 
  //   if (meetings>0) setMeetings(meetings-1) 
  //   else return
  // }

  // function onFeelingAdd () { 
  //   if (feeling<10) setFeeling(feeling+1)
  //   else return
  // }

  // function onFeelingMinus () { 
  //   if (feeling>0) setFeeling(feeling-1)
  //   else return
  // }