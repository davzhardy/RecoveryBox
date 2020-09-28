import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import _ from 'lodash'
import SuggestionItem from '../components/SuggestionItem'
import {useDispatch, useSelector } from "react-redux";
import {DateTime} from 'luxon'
import colors from '../styles/colors'
import { MediumAppText, BoldAppText } from '../styles/text'


function HistoryScreen () {

  const selectedDate = useSelector((state) => state.helper.selectedDate)
  const fullHistoricalInfo = useSelector((state) => state.historicalData)
  const requiredInfo = _.filter(fullHistoricalInfo, el => el.date === selectedDate)

  let startingFeeling = 0; 
  if (requiredInfo.length) startingFeeling = requiredInfo[0].feeling;
  
  let startingMeetings = 0; 
  if (requiredInfo.length) startingMeetings = requiredInfo[0].meetings;

  let startingMoods = []; 
  if (requiredInfo.length) startingMoods = requiredInfo[0].moods;

  let startingSuggestions = []; 
  if (requiredInfo.length) startingSuggestions = requiredInfo[0].suggestions;

  const [feeling, setFeeling] = useState(startingFeeling)
  const [meetings, setMeetings ] = useState(startingMeetings)
  const [moodsArr, setMoods] = useState(startingMoods)
  const [suggestionsArr, setSuggestions] = useState(startingSuggestions)

  function onMeetingsAdd () {
    setMeetings(meetings+1) 
  }

  function onMeetingsMinus () { 
    if (meetings>0) setMeetings(meetings-1) 
    else return
  }

  function onFeelingAdd () { 
    if (feeling<10) setFeeling(feeling+1)
    else return
  }

  function onFeelingMinus () { 
    if (feeling>0) setFeeling(feeling-1)
    else return
  }

  //TODO format and add put request

    return (
      <View style={styles.container}>
        <HomeWelcome historicalDate={selectedDate}/>
        {requiredInfo.length ? <></> : <Text>You have no data for today. You can always add to your historical record though...</Text>}
      <View style={styles.infoWrapper}>  
        <View style={styles.infosubWrapper}>
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
        <View>
          <MediumAppText>Feeling:</MediumAppText>
          <BoldAppText style={{marginTop: -10,}}>{feeling} / 10</BoldAppText>
          <View style={styles.iconWrapper}>
            <TouchableOpacity style={styles.icon} onPress={()=>onFeelingMinus()}>
              <Image source={require('../assets/remove.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>onFeelingAdd()}>
              <Image source={require('../assets/add.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <MediumAppText>Moods:</MediumAppText>
          {moodsArr.map(
            mood => <BoldAppText key={mood} style={{marginTop: -10, fontSize: 17}}>{mood}</BoldAppText>
          )}
        </View>
        <View>
        <MediumAppText>Suggestions completed:</MediumAppText>
          {suggestionsArr.map(
            suggestion => <BoldAppText key={suggestion} style={{marginTop: -10, fontSize: 16}}>{suggestion}</BoldAppText>
          )}
        </View>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={() => clickHandler(dailyInfo)}>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    width: '45%'
  },
  iconWrapper: {
    
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-around'

  },
});



export default HistoryScreen;