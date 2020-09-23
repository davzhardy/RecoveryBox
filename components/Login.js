import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Navigation from './Navigation'

function Login () {

  const [username, onChangeUsername] = useState(false);
  const [password, onChangePassword] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [warning, setWarning] = useState(false); 

  const submitHandler = () => {
    if (username && password) {
      setNavigation(true)
    } else {
      setWarning(true)
    }
  }

  return (
    !navigation ?
    <View>
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
      <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
        <Text>Please submit me</Text>
      </TouchableOpacity>
  
      <View>
        { 
          warning ? <Text>Please submit both a username and password</Text> : null
        }
      </View>
    </View>
    : <Navigation/>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: '#DFE2E2'
  }
});



export default Login;