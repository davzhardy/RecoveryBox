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
  },
  settings: {
    suggestionSettings: {
      suggestionsList: ['Meetings', 'Step 10s', 'Prayer'],
      fullSuggestionsList: ['Meetings', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself', 'Gratitude', 'Step 10s', 'Inventory', 'Called a Newcomer', 'Ate a'],
    },
    userSettings: {
      spare: [],
    }
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
    case "ADDTO_SUGGESTIONS_LIST":
      return {
        ...state,
        settings: {
          ...state.settings,
          suggestionSettings: {
            ...state.settings.suggestionSettings,
            suggestionsList: [...state.settings.suggestionSettings.suggestionsList, action.payload]
          }
        }
      }
    case "REMOVEFROM_SUGGESTIONS_LIST":
      return {
        ...state,
        settings: {
          ...state.settings,
          suggestionSettings: {
            ...state.settings.suggestionSettings,
            suggestionsList: state.settings.suggestionSettings.suggestionsList.filter(elInList => elInList !== action.payload)
          }
        }
      }  
    default:
      return state;
   }
}

const store = createStore(reducer);

export default store
