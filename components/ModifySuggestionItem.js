import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";

function ModifySuggestionItem ({name, addTick, selected}) {

  const selectedStyling = '#FF55B8';
  const notSelectedStyling = '#BBBCCD';
  const suggestionList = useSelector((state) => state.settings.suggestionSettings.suggestionsList);

  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <Button title={name} color={selected ? selectedStyling : notSelectedStyling} marginTop={0} onPress={() => addTick(suggestionList ,name)}></Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ModifySuggestionItem;