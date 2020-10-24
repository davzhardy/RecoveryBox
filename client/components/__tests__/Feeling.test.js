import React from 'react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import renderer from 'react-test-renderer';

import dailyInfoReducer from '../../redux/dailyInfoReducer'
import ModifySuggestionItem from '../Feeling';

const initialState = {
	dailyInfo: {
		meetings: 0,
		feeling: 0,
		moods: [],
		suggestions: [],
	}
}

const store = createStore(dailyInfoReducer, initialState);

test('renders correctly', () => {
	const tree = renderer.create(<Provider store = {store}><ModifySuggestionItem/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});