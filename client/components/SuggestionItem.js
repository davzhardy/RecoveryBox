import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

function SuggestionItem({ name, clickHandler, selected }) {

  const dailySuggestions = useSelector((state) => state.dailyInfo.suggestions)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {clickHandler(dailySuggestions, name)}}>
          <LinearGradient colors={selected ? selectedStyling : notSelectedStyling} style={styles.button}>
          </LinearGradient>
      </TouchableOpacity>
      <Text>{name}</Text>
    </View>
  );
}

const notSelectedStyling = ['#ADF1FF', '#FFF4E4']
const selectedStyling = ['#FF8787', '#FF55B8']

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 50,
    marginHorizontal: 20,
  },
});

export default SuggestionItem;