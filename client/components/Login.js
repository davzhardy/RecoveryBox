import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { BoldAppText, MediumAppText } from '../styles/text'
import {useDispatch, useSelector } from "react-redux";
import ApiService from '../ApiService'
import colors from '../styles/colors'
import { NavigationContainer, StackActions } from '@react-navigation/native';

import Expo from 'expo';
import * as Google from 'expo-google-app-auth';
import { androidClientId, iosClientId } from '../config/secret.js'
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

function LoginScreen ({ navigation }) {

  // TODO: refactor to not have to useState for passwordInput and usernameInput?
  // TODO: add a warning if your user is not on the db and don't trigger the navigation 
  const dispatch = useDispatch();

  const [usernameInput, onChangeUsername] = useState(useSelector((state) => state.user.username));
  const [passwordInput, onChangePassword] = useState(useSelector((state) => state.user.password));
  const [warning, setWarning] = useState(false); 
  const [jwt, setJwt] = userState('');

  const submitHandler = async () => {
    if (usernameInput && passwordInput) {
      await receiveInfoandData(usernameInput);
      navigation.dispatch(
        StackActions.replace('Home'))
    } else {
      setWarning(true);
    }
  }

  const oAuthSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ['profile', 'email'],
        redirectUrl: `com.mazethernandez.recoverybox:/oauth2redirect/google` 
        //check if this also work for android phone
      });
      if (result.type === 'success') {
        console.log('user', result);
        receiveJwt(result.idToken);
      } else {
      console.log('TYPE', result.type);
      console.log('cancelled');
      }
    } catch (e) {
    console.log('error', e);
    }
  }

  function receiveJwt (userToken) {
    //if statemtn what if error?
    ApiService.getJwt(userToken)
      .then(serverResponse => setJwt(serverResponse.accessToken))
  }

  useEffect(() => {
    //TODO how to use the jwt?
    await receiveInfoandData(/*jwt + userId*/);
    navigation.dispatch(
    StackActions.replace('Home'))
  }, [jwt])

  function receiveInfoandData (userId) {
    ApiService.getUserInfo(userId)
    .then(data => {
      let dispatchtoUser = {
        id: data[0].id,
        email: data[0].id,
        username: data[0].username,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        registrationDate: data[0].registrationDate,
      }
      for (let i of data[0].Data) {
        i.date = Number(i.date)
        let parseMoods = i.moods.replace(/[\[\]',"]+/g,'')
        let arrayMoods;
        if (parseMoods.length) arrayMoods = parseMoods.split(' ')
        if (arrayMoods===undefined) arrayMoods = []
        i.moods = arrayMoods
        i.suggestions = eval(i.suggestions)
      }
      let dispatchtoHistoricalData = data[0].Data
      dispatch({
        type: 'UPDATE_USERINFO',
        payload: dispatchtoUser
      })
      dispatch({
        type: 'CREATE_HISTORICALDATA',
        payload: dispatchtoHistoricalData
      })
    })
  }

  return (
    <View style={styles.container}>
      <BoldAppText style={styles.logo}>RecoveryBox</BoldAppText>
      <View style={styles.inputView} >
        <TextInput
          placeholder='Enter a username'
          value= {usernameInput ? usernameInput : ''}
          onChangeText={text => onChangeUsername(text)}
          style={styles.inputText}
          placeholderTextColor={colors.platinum}
          textContentType={'username'}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          placeholder='Enter a password'
          value= {passwordInput ? passwordInput : ''}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={text => onChangePassword(text)}
          placeholderTextColor={colors.platinum}
        />
      </View>
      <TouchableOpacity style={styles.oAuthButton} onPress={() => oAuthSignIn()}>
        <Text style={styles.text}>oAuth LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {marginTop:7}]}>
        <Text style={styles.text}>REGISTER</Text>
      </TouchableOpacity>
      <View>
        { 
          warning ? <Text>Please submit both a username and password</Text> : null
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.platinum,
  },
  inputView:{
    width:"80%",
    backgroundColor: colors.blue,
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
  },
  logo: {
    color: colors.orange, 
    fontSize: 40,
    marginBottom: 60,
  },
  inputText: {
    height:50,
    color:'white',
    textAlign: 'center',
  },
  button: {
    width:"60%",
    backgroundColor: colors.orange,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10,
  },
  oAuthButton: {
    width:"60%",
    backgroundColor: colors.green,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10,
  },
  text: {
    fontFamily: 'Montserrat_500Medium',
    fontStyle: "normal",
    fontSize: 16,
    color: "white",

  }
});



export default LoginScreen;