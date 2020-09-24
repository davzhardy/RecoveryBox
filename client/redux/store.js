import { createStore } from "redux";
import { combineReducers } from "redux";
import dailyInfoReducer from './dailyInfoReducer'
import settingsReducer from './settingsReducer'
import userReducer from './userReducer'

const rootReducer = (combineReducers)({
  user: userReducer,
  dailyInfo: dailyInfoReducer,
  settings: settingsReducer
})

const store = createStore(rootReducer);

export default store
