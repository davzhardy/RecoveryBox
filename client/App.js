import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/Login'
import HomeScreen from './containers/HomeScreen'
import CalendarScreen from './containers/CalendarScreen'
import ModifySuggestionsList from './containers/ModifySuggestionsList'
import SummaryScreen from './containers/SummaryScreen'
import HistoryScreen from './containers/HistoryScreen'
import {useFonts, Montserrat_500Medium, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import { Provider } from "react-redux";
import store from './redux/store'
import colors from './styles/colors'


const Stack = createStackNavigator();


export default function App() {

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if(!fontsLoaded) {
    return null
  } else {
    return (
      <Provider store={store}>
       <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerShown : false}} component={LoginScreen}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{ 
              title: 'Today',
              headerStyle: {
                backgroundColor: 'white',
                
              },
              headerTitleStyle: {
                color: colors.orange,
                fontFamily: 'Montserrat_700Bold',
              },
              headerRight:() => {
                return (
                <TouchableOpacity>
                  <Image style={{height:70, width:70, marginRight:35, marginTop:-20}} source={require('./assets/logo.jpeg')}/>
                </TouchableOpacity>) }             
              }}
            />
            <Stack.Screen name="Calendar" component={CalendarScreen} options={{
              title: 'Calendar',
              headerStyle: {
                backgroundColor: 'white',
                
              },
              headerTitleStyle: {
                color: colors.orange,
                fontFamily: 'Montserrat_700Bold',
              },
              headerLeft:null,
              headerRight:() => {
                return (
                <TouchableOpacity>
                  <Image style={{height:70, width:70, marginRight:35, marginTop:-20}} source={require('./assets/logo.jpeg')}/>
                </TouchableOpacity>) }  
              
            }}/>
            <Stack.Screen name="ModifySuggestions" options={{ headerShown: false }} component={ModifySuggestionsList}/>
            <Stack.Screen name="Summary" component={SummaryScreen} options={{
              title: 'Summary',
              headerStyle: {
                backgroundColor: 'white',
                
              },
              headerTitleStyle: {
                color: colors.orange,
                fontFamily: 'Montserrat_700Bold',
              },
              headerLeft:null,
              headerRight:() => {
                return (
                <TouchableOpacity>
                  <Image style={{height:70, width:70, marginRight:35, marginTop:-20}} source={require('./assets/logo.jpeg')}/>
                </TouchableOpacity>) }  
            }}/>
            <Stack.Screen name="History" component={HistoryScreen} options={{ 
              title: 'Your History',
              headerTitleStyle: {
                color: colors.orange,
                fontFamily: 'Montserrat_700Bold',
              },
              headerRight:() => {
                return (
                <TouchableOpacity>
                  <Image style={{height:70, width:70, marginRight:35, marginTop:-20}} source={require('./assets/logo.jpeg')}/>
                </TouchableOpacity>) }  
            }} />
          </Stack.Navigator>
      </NavigationContainer>
      </Provider> 
    );
  }
}

