import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import {  BoldAppText, MediumAppText } from '../styles/text'
import {useDispatch, useSelector} from "react-redux";

function LoginScreen ({navigation}) {

  const [username, onChangeUsername] = useState(false);
  const [password, onChangePassword] = useState(false);
  const [warning, setWarning] = useState(false); 

  const firstName = useSelector((state) => state.user.firstName)
  const userName = useSelector((state) => state.user.username)
  const dispatch = useDispatch();

  const submitHandler = (arg) => {
    if (username && password) {
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
      <BoldAppText>Welcome to RecoveryBox {userName}</BoldAppText>
      <MediumAppText style={{fontSize : 20}}>Please enter your details to log-in</MediumAppText>
      <TextInput
        placeholder='Enter a username'
        value= {username ? username : ''}
        onChangeText={text => onChangeUsername(text)}
        style={styles.input}
        textContentType={'username'}
      />
      <TextInput
        placeholder='Enter a password'
        value= {password ? password : ''}
        secureTextEntry={true}
        onChangeText={text => onChangePassword(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => submitHandler(username)}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DFE2E2',
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