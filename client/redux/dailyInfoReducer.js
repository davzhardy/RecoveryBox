const initialState = {
  meetings: 0,
  feeling: false,
  moods: [],
  suggestions: [],
}

const dailyInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_DAILY_MEETINGS":
      return {
        ...state,
        meetings: state.meetings +1
      }
    case "DECREMENT_DAILY_MEETINGS":
      return {
        ...state,
        meetings: state.meetings -1
      }
    case "UPDATE_FEELING":
      return {
        ...state,
        feeling: action.payload
      }
    case "ADDTO_SUGGESTIONS":
      return {
        ...state,
        suggestions: [...state.suggestions, action.payload]
      }
    case "REMOVEFROM_SUGGESTIONS":
    return {
      ...state,
      suggestions: state.suggestions.filter(elInList => elInList !== action.payload)
    }
    case "UPDATE_MOODS":
    return {
      ...state,
      moods: [...state.moods, ...action.payload]
    }
    default:
      return state;
   }
}

export default dailyInfoReducer;