import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useDispatch, useSelector} from "react-redux";

function HomeScreen () {

  const username = useSelector((state) => state.user.username)

  return (
    <View style={styles.container}>
      <Text>Homescreen for {username}</Text>
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



export default HomeScreen;