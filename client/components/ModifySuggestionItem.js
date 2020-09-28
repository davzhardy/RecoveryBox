import React from 'react';
import { StyleSheet, View, Modal, Button, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import colors from '../styles/colors'
import { BoldAppText, MediumAppText } from '../styles/text'

function ModifySuggestionItem ({name, addTick, selected}) {

  const suggestionList = useSelector((state) => state.settings.suggestionSettings.suggestionsList);

  return (
    <View style={styles.container}>
      <View style={selected ? styles.selectedStyling : styles.unselectedStyling} >
      <TouchableOpacity onPress={() => addTick(suggestionList ,name)}>
        <MediumAppText style={{marginBottom:0, color:'white'}} >{name}</MediumAppText>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  selectedStyling: {
    flex: 1,
    marginTop:5, 
    opacity:0.85,
    minWidth: 150,
    height: 30,
    backgroundColor: colors.green,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  unselectedStyling: {
    flex: 1,
    width: 150,
    height: 20,
    marginTop:5, 
    opacity:0.5,
    backgroundColor: colors.darkGrayFont,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default ModifySuggestionItem;