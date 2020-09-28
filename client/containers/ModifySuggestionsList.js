import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MediumAppText } from '../styles/text'
import ModifySuggestionItem from '../components/ModifySuggestionItem'
import {useDispatch, useSelector} from "react-redux";
import colors from '../styles/colors';

function ModifySuggestionsList ({ navigation: { goBack } }) {

// TODO refactor to be a modal screen

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
        <MediumAppText style={{marginTop: 25}}>CUSTOMISE YOUR DAILY SUGGESTIONS</MediumAppText>
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
        <TouchableOpacity style={styles.return} onPress={()=> {goBack()}}>
          <Image style={styles.image} source={require('../assets/close.png')}/>
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
    marginTop: 25,
  },
  image: {
    height: 30,
    width: 30,
  },
  return: {
    marginTop: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ModifySuggestionsList;