import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SuggestionItem({name}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity>
          <LinearGradient colors={lineargradient} style={styles.button}></LinearGradient>
      </TouchableOpacity>
      <Text>{name}</Text>
    </View>
  );
}

const lineargradient = ['#ADF1FF', '#FFF4E4']

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