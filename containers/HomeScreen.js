import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomeWelcome from '../components/HomeWelcome'
import Feeling from '../components/Feeling'
import Meetings from '../components/Meetings'
import SuggestionsList from '../components/SuggestionsList'
// import InspirationalQuote from '../components/InspirationalQuote'
// import ApiService from '../ApiService'
// import { AppLoading } from 'expo';

function HomeScreen () {

  // const { isLoading, error, data } = ApiService.fetchQuote()

  // if(error) {
  //   return (
  //   <View style={styles.container}>
  //     <HomeWelcome/>
  //     <Feeling/>
  //     <Meetings/>
  //     <SuggestionsList/>
  //   </View>
  //   )
  // } else {
    return (
      // isLoading ?
      // <AppLoading/>
      // :
      <View style={styles.container}>
        <HomeWelcome/>
        {/* <InspirationalQuote quote={data[0].q} author={data[0].a}/> */}
        <Feeling/>
        <Meetings/>
        <SuggestionsList/>
      </View>
  )
// };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },

});



export default HomeScreen;