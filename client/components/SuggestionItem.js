import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../styles/colors'
import { MediumAppText, BoldAppText } from '../styles/text'

function SuggestionItem({ name, clickHandler, selected }) {

  const dailySuggestions = useSelector((state) => state.dailyInfo.suggestions)

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => {clickHandler(dailySuggestions, name)}}
        style={selected? styles.selectedButton : styles.unselectedButton}
      >
        {selected ? <Image style={styles.tick} source={require('../assets/tick.png')}/> : <></>}
      </TouchableOpacity>
      <MediumAppText style={selected? styles.selectedText : styles.unselectedText}>{name}</MediumAppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
    minWidth: 55
  },
  unselectedButton: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom:10,
    backgroundColor: colors.lightWarmGray,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  selectedButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom:5,
    backgroundColor: colors.green,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  tick: {
    width: 15,
    height: 15,
  }, 
  unselectedText: {
    fontSize: 10, 
    marginBottom: 5, 
    textAlign:'center',
  },
  selectedText: {
    fontSize: 10, 
    marginBottom: 5, 
    textAlign:'center',
    fontFamily: 'Montserrat_700Bold'
  },
});

export default SuggestionItem;