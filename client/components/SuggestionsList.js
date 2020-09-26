import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { MediumAppText } from '../styles/text';
import SuggestionItem from './SuggestionItem';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import Divider from './Divider'

function SuggestionsList () {

  const dispatch = useDispatch();
  const suggestionListToDisplay = useSelector((state) => state.settings.suggestionSettings.suggestionsList);
  const navigation = useNavigation();
  const dailySuggestions = useSelector((state) => state.dailyInfo.suggestions);

  function clickHandler (list, suggestion) {
    if (!list.includes(suggestion)) {
      dispatch({
        type: "ADDTO_SUGGESTIONS",
        payload: suggestion
      });
    } else {
      dispatch({
        type: "REMOVEFROM_SUGGESTIONS",
        payload: suggestion
      });
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <MediumAppText style={{fontSize: 10, marginTop: 25}}  onPress={() => navigation.navigate('ModifySuggestions')}>MY DAILY SUGGESTIONS</MediumAppText>
      </View>
      <View style={styles.cog}>
        <TouchableOpacity onPress={() => navigation.navigate('ModifySuggestions')}>
          <Image style={styles.icons} source={require('../assets/cog.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.suggestionWrapper}>
        {suggestionListToDisplay.map(
          suggestion =>
          <SuggestionItem
            key={suggestion}
            name={suggestion}
            clickHandler={clickHandler}
            selected={dailySuggestions.includes(suggestion) ? true : false}
          />
        )}
      </View>
      <Divider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cog: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  icons: {
    height: 34,
    width: 34,
  },
  suggestionWrapper: {
    display: 'flex',
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center', 
    justifyContent: 'space-around'
  }
});

export default SuggestionsList;