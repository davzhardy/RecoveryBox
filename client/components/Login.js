import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { BoldAppText, MediumAppText } from '../styles/text'
import {useDispatch, useSelector } from "react-redux";
import ApiService from '../ApiService'
import colors from '../styles/colors'
import { NavigationContainer, StackActions } from '@react-navigation/native';


function LoginScreen ({ navigation }) {

  const dispatch = useDispatch();

  const [usernameInput, onChangeUsername] = useState(useSelector((state) => state.user.username));
  const [passwordInput, onChangePassword] = useState(useSelector((state) => state.user.password));
  const [warning, setWarning] = useState(false); 

  const submitHandler = async () => {
    if (usernameInput && passwordInput) {
      await receiveInfoandData(usernameInput);
      navigation.dispatch(
        StackActions.replace('Home'))
    } else {
      setWarning(true);
    }
  }

  const registerHandler = () => {
    navigation.navigate('Register')
  }

  function receiveInfoandData (username) {
    ApiService.getUserInfo(username)
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
      <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {marginTop:7}]} onPress={() => registerHandler()}>
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
    fontFamily: 'Montserrat_500Medium',
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
    fontFamily: 'Montserrat_500Medium',
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
  text: {
    fontFamily: 'Montserrat_500Medium',
    fontStyle: "normal",
    fontSize: 16,
    color: "white",

  }
});



export default LoginScreen;