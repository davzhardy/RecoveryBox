import React from 'react';
import HomeScreen from '../HomeScreen';
import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "../../redux/userReducer";
import renderer from 'react-test-renderer';
import { combineReducers } from "redux";
import {DateTime} from 'luxon';

//TODO: refactor to use redux-mock-store
const initialDailyInfoState = {
  meetings: 0,
  feeling: 0,
  moods: [],
  suggestions: [],
}
const initialHelperState = {
  now: DateTime.local().toUTC().ts,
  dayRegistered: false
}
const initialUserState = {
  id: false,
}
const mockRootReducer = (combineReducers)({
  dailyInfo: initialDailyInfoState,
  helper: initialHelperState,
  user: initialUserState
})

const store = createStore(mockRootReducer);

describe("Homepage Screen rendering", () => {
  test('Should render correctly with initial state', () => {
    const tree = renderer.create(<Provider store = {store}><HomeScreen/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  })
});


