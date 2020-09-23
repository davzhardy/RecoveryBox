import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Login'
import HomeScreen from './containers/Home'
import {useFonts, Montserrat_500Medium, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import { AppLoading } from 'expo';
import { Provider } from "react-redux";
import store from './redux/store'

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
       <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerShown : false}} component={LoginScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
      
          </Stack.Navigator>
        </NavigationContainer>
      </Provider> 
    );
  }
}

