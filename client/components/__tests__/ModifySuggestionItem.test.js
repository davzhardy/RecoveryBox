import React from 'react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import renderer from 'react-test-renderer';

import settingsReducer from '../../redux/settingsReducer'
import ModifySuggestionItem from '../ModifySuggestionItem';

const initialState = {
  settings: {
    suggestionSettings: {
      suggestionsList: ['Meetings', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself', 'Gratitude', 'Step 10s', 'Inventory', 'Called a Newcomer', 'Apologised'],
      fullSuggestionsList: ['Meetings', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself', 'Gratitude', 'Step 10s', 'Inventory', 'Called a Newcomer', 'Apologised'],
    },
    userSettings: {
      spare: [],
    }
  }
};

const store = createStore(settingsReducer, initialState);

test('renders correctly', () => {
  const tree = renderer.create(<Provider store = {store}><ModifySuggestionItem/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

