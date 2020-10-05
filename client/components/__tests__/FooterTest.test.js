// import React from 'react';
// import renderer from 'react-test-renderer';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import helperReducer from '../../redux/helperReducer';
// import Footer from '../Footer';
// import { DateTime } from 'luxon'
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// const initialState = {
//   now: DateTime.local().toUTC().ts,
//   selectedDate: false,
//   chartTimePeriod: 'week',
//   dayRegistered: false,
//   registerModal: false,
//   routeName: '',
// }

// const store = createStore(helperReducer, initialState);

// const Stack = createStackNavigator();

// const MockedNavigator = ({component, params = {} }) => {  
// 	return (    
// 	<NavigationContainer><Stack.Navigator>
// 		<Stack.Screen name="MockedScreen" component={component} initialParams={params}/>    
// 	</Stack.Navigator></NavigationContainer> 
// 	);
// };

// test('renders correctly', () => {
//   const tree = renderer.create(<Provider store={store}><MockedNavigator component={Footer} params={{routeName: ''}} ></MockedNavigator></Provider>).toJSON();
//   expect(tree).toMatchSnapshot();
// });