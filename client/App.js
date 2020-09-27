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
import { AppLoading } from 'expo';
import { Provider } from "react-redux";
import store from './redux/store'
import colors from './styles/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
            <Stack.Screen name="Home" component={HomeScreen} options={{ 
              title: 'Today',
              headerStyle: {
                backgroundColor: 'white',
                
              },
              headerTitleStyle: {
                color: colors.orange,
                fontFamily: 'Montserrat_700Bold',
              },
              headerRight:({ navigation }) => {
                return (
                <TouchableOpacity onPress={() => navigation.navigate('ModifySuggestions')}>
                  <Image style={{height:30, width:30, marginRight:35}} source={require('./assets/settings.png')}/>
                </TouchableOpacity>) }             
              }}
            />
            <Stack.Screen name="Calendar" options={{ headerShown: false }} component={CalendarScreen}/>
            <Stack.Screen name="ModifySuggestions" options={{ headerShown: false }} component={ModifySuggestionsList}/>
            <Stack.Screen name="Summary" component={SummaryScreen}/>
            <Stack.Screen name="History" options={{ title: 'How were you feeling?' }} component={HistoryScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
      </Provider> 
    );
  }
}

