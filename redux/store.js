import { createStore } from "redux";

const initialState = {
  user: {
    username: false,
    password: false,
    firstName: 'David',
    lastName: 'Hardy',
  },
  dailyInfo: {
    meetings: 2,
    feeling: 50,
    moods: [],
    suggestions: [],
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload
        }
      }
    case "INCREMENT_DAILY_MEETINGS":
      return {
        ...state,
        dailyInfo: {
          ...state.dailyInfo,
          meetings: state.dailyInfo.meetings +1
        }
      }
    case "DECREMENT_DAILY_MEETINGS":
      return {
        ...state,
        dailyInfo: {
          ...state.dailyInfo,
          meetings: state.dailyInfo.meetings -1
        }
      }
    default:
      return state;
   }
}

const store = createStore(reducer);

export default store
