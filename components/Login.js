import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { BoldAppText, MediumAppText } from '../styles/text'
import {useDispatch, useSelector} from "react-redux";

function LoginScreen ({navigation}) {

  // fix: refactor to not have to useState for passwordInput and usernameInput?
  const dispatch = useDispatch();

  const [usernameInput, onChangeUsername] = useState(useSelector((state) => state.user.username));
  const [passwordInput, onChangePassword] = useState(useSelector((state) => state.user.password));
  const [warning, setWarning] = useState(false); 

  const submitHandler = (arg) => {
    if (usernameInput && passwordInput) {
      dispatch({
        type: 'UPDATE_USERNAME',
        payload: arg
      })
      navigation.navigate('Home');
    } else {
      setWarning(true);
    }
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
      <TouchableOpacity style={styles.button} onPress={() => submitHandler(usernameInput)}>
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