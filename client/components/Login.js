import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { BoldAppText, MediumAppText } from '../styles/text'
import {useDispatch, useSelector } from "react-redux";
import ApiService from '../ApiService'

function LoginScreen ({ navigation }) {

  // TODO: refactor to not have to useState for passwordInput and usernameInput?
  const dispatch = useDispatch();

  const [usernameInput, onChangeUsername] = useState(useSelector((state) => state.user.username));
  const [passwordInput, onChangePassword] = useState(useSelector((state) => state.user.password));
  const [warning, setWarning] = useState(false); 

  const submitHandler = async () => {
    if (usernameInput && passwordInput) {
      await receiveInfoandData(usernameInput)
      navigation.navigate('Home');
    } else {
      setWarning(true);
    }
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
        i.moods = i.moods.replace(/[\[\]',]+/g,'').split(' ')
        i.suggestions = eval(i.suggestions).join(","). split(",")
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
      <BoldAppText>Welcome to RecoveryBox</BoldAppText>
      <MediumAppText style={{fontSize : 20}}>Please enter your details to log-in</MediumAppText>
      <TextInput
        placeholder='Enter a username'
        value= {usernameInput ? usernameInput : ''}
        onChangeText={text => onChangeUsername(text)}
        style={styles.input}
        textContentType={'username'}
      />
      <TextInput
        placeholder='Enter a password'
        value= {passwordInput ? passwordInput : ''}
        secureTextEntry={true}
        onChangeText={text => onChangePassword(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
        <MediumAppText>Please submit me</MediumAppText>
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
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '10%',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: '#ADF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  }
});



export default LoginScreen;