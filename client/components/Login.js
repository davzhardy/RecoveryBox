import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { BoldAppText } from '../styles/text'
import {useDispatch, useSelector, connect } from "react-redux";
import ApiService from '../ApiService'
import colors from '../styles/colors'
import { StackActions } from '@react-navigation/native';

import * as Google from 'expo-google-app-auth';
import { androidClientId, iosClientId } from '../config/secret.js'

// const jwt = useSelector((state) => state.jwt);
  
function LoginScreen ({ navigation }) {

  // TODO: refactor to not have to useState for passwordInput and usernameInput?
  // TODO: add a warning if your user is not on the db and don't trigger the navigation 
  const dispatch = useDispatch();

  const [warning, setWarning] = useState(false);
  const [jwt, setJwt] = useState('');
  const [googleOauth, setGoogleOauth] = useState('');

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
        await setGoogleOauth(result.user.id);
        receiveJwt({idToken: result.idToken});
      } else {
      console.log('TYPE', result.type);
      console.log('cancelled');
      }
    } catch (e) {
    console.log('error', e);
    }
  }
  
  function receiveJwt (userToken) {
    //FIX: deal with error
    ApiService.getJwt(userToken)
      .then(serverResponse => {
        setJwt(serverResponse.accessToken)
        dispatch({
          type: 'SAVE_JWT',
          payload: serverResponse.accessToken
        })
        // dispatchJWT(serverResponse.accessToken);
        // receiveInfoandData(googleOauth, jwt.jwt );
        // console.log('jwt:', jwt.jwt)
        // navigation.dispatch(
          // StackActions.replace('Home')
        // )
      })
        // setJwt(serverResponse.accessToken)
  }

  useEffect(() => {
    if (jwt.length && googleOauth.length) {
      receiveInfoandData(googleOauth, jwt)
      navigation.dispatch(
        StackActions.replace('Home')
      )
    }
  }, [jwt])

  function receiveInfoandData (userId, accessToken) {
    ApiService.getUserInfo(userId, accessToken)
    .then(data => {
      let dispatchtoUser = {
        id: data[0].id,
        email: data[0].email,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
      }
      if(data[0].Data.length) {
        for (let i of data[0].Data) {
          i.date = Number(i.date)
          let parseMoods = i.moods.replace(/[\[\]',"]+/g,'')
          let arrayMoods;
          if (parseMoods.length) arrayMoods = parseMoods.split(' ')
          if (arrayMoods===undefined) arrayMoods = []
          i.moods = arrayMoods
          i.suggestions = eval(i.suggestions)
        }
      }
      let dispatchtoHistoricalData = data[0].Data
      console.log('dispatchtoHistoricalData:', dispatchtoHistoricalData)
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
      <TouchableOpacity style={styles.oAuthButton} onPress={() => oAuthSignIn()}>
        <Text style={styles.text}>LOGIN WITH GOOGLE</Text>
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

// function mapStateToProps(state) {  
//   return {   
//       jwt: state.jwt,    
//     };
//   }
// function mapDispatch(dispatch) {
//     return {
//       dispatchJWT: (token) => dispatch({
//         type:'SAVE_JWT',
//         payload: token
//       })
//     };
// }
export default LoginScreen;
// export default connect(mapStateToProps, mapDispatch)(LoginScreen);