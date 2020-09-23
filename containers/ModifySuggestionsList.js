import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MediumAppText } from '../styles/text'
import ModifySuggestionItem from '../components/ModifySuggestionItem'
import { LinearGradient } from 'expo-linear-gradient';
import {useDispatch, useSelector} from "react-redux";

function ModifySuggestionsList ( {navigation} ) {

  const dispatch = useDispatch()
  const fullSuggestionsList = useSelector((state) => state.settings.suggestionSettings.fullSuggestionsList);
  const suggestionList = useSelector((state) => state.settings.suggestionSettings.suggestionsList);

  const addTick = (list, suggestion) => {
    if (!list.includes(suggestion)) {
      dispatch({
        type: 'ADDTO_SUGGESTIONS_LIST',
        payload: suggestion
      });
    } else {
      dispatch({
        type: 'REMOVEFROM_SUGGESTIONS_LIST',
        payload: suggestion
      })
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <MediumAppText style={{fontSize: 10, marginTop: 40}}>DAILY SUGGESTIONS</MediumAppText>
        <Text style={{marginTop: 25}}>CUSTOMISE YOUR HOMESCREEN DAILY SUGGESTIONS HERE</Text>
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {fullSuggestionsList.map(
          suggestion => 
          <ModifySuggestionItem
            key={suggestion}
            name={suggestion}
            addTick={addTick}
            selected={suggestionList.includes(suggestion) ? true : false}
          />
        )}
      <TouchableOpacity onPress={()=> {navigation.navigate('Home')}}>
        <LinearGradient colors={['#5555FF', '#9787FF']} style={styles.return}>
          <Text style={{color:'white', fontSize: 10}}>Home</Text>
        </LinearGradient>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icons: {
    height: 34,
    width: 34,
  },
  return: {
    marginTop: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ModifySuggestionsList;