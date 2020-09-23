import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function Home () {

  return (
    <View style={styles.container}>
      <Text>Homescreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

});



export default Home;