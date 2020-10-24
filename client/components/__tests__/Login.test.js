import React from 'react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "../../redux/userReducer";
import renderer from 'react-test-renderer';
import Login from '../Login';

const initialState = {
  user: {
    id: false,
    email: false,
    username: false,
    password: 'TODO: replace me',
    firstName: false,
    lastName: false,
    registrationDate: false,
  }
}

const store = createStore(userReducer, initialState);

test('renders correctly', () => {
  const tree = renderer.create(<Provider store = {store}><Login/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});