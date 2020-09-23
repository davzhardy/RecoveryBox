import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

function LoginScreen ({navigation}) {

  const [username, onChangeUsername] = useState(false);
  const [password, onChangePassword] = useState(false);
  const [warning, setWarning] = useState(false); 

  const submitHandler = () => {
    if (username && password) {
      navigation.navigate('Home');
    } else {
      setWarning(true);
    }
  }

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    width: '10%',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: '#DFE2E2'
  }
});



export default LoginScreen;