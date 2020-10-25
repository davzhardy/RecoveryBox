import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { BoldAppText, MediumAppText } from '../styles/text'
import {useDispatch, useSelector } from "react-redux";
import ApiService from '../ApiService'
import colors from '../styles/colors'
import { NavigationContainer, StackActions } from '@react-navigation/native';


function Register ({ navigation }) {

  // TODO: refactor to not have to useState for passwordInput and usernameInput?
  // TODO: add a warning if your user is not on the db and don't trigger the navigation 
  const dispatch = useDispatch();

  const [usernameInput, onChangeUsername] = useState(useSelector((state) => state.user.username));
  const [passwordInput, onChangePassword] = useState(useSelector((state) => state.user.password));
  const [firstNameInput, onChangeFirstName] = useState(useSelector((state) => state.user.firstName));
  const [lastNameInput, onChangeLastName] = useState(useSelector((state) => state.user.lastName));
  const [emailInput, onChangeEmail] = useState(useSelector((state) => state.user.email));
  const [warning, setWarning] = useState(false); 

  return (
    <View style={styles.container}>
      <BoldAppText style={styles.logo}>RecoveryBox</BoldAppText>
      <View style={styles.inputView} >
        <TextInput
          placeholder='Username'
          value= {usernameInput ? usernameInput : ''}
          onChangeText={text => onChangeUsername(text)}
          style={styles.inputText}
          placeholderTextColor={colors.platinum}
          textContentType={'username'}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          placeholder='Password'
          value= {passwordInput ? passwordInput : ''}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={text => onChangePassword(text)}
          placeholderTextColor={colors.platinum}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          placeholder='First name'
          value= {passwordInput ? passwordInput : ''}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={text => onChangeFirstName(text)}
          placeholderTextColor={colors.platinum}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          placeholder='Last name'
          value= {passwordInput ? passwordInput : ''}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={text => onChangeLastName(text)}
          placeholderTextColor={colors.platinum}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          placeholder='Email address'
          value= {passwordInput ? passwordInput : ''}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={text => onChangeEmail(text)}
          placeholderTextColor={colors.platinum}
        />
      </View>
      <TouchableOpacity style={[styles.button, {marginTop:7}]}>
        <Text style={styles.text}>REGISTER USER</Text>
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
    height:40,
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
    fontFamily: 'Montserrat_500Medium',
  },
  text: {
    fontFamily: 'Montserrat_500Medium',
    fontStyle: "normal",
    fontSize: 16,
    color: "white",

  }
});



export default Register;