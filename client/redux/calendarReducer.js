const initialState = {
  meetings: 0,
  feeling: 0,
  moods: [],
  suggestions: [],
}

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_HISTORICAL_MEETINGS":
      return {
        ...state,
        meetings: state.meetings +1
      }
    case "DECREMENT_HISTORICAL_MEETINGS":
      return {
        ...state,
        meetings: state.meetings -1
      }
    case "INCREMENT_HISTORICAL_FEELING":
      return {
        ...state,
        meetings: state.meetings +1
      }
    case "DECREMENT_HISTORICAL_FEELING":
      return {
        ...state,
        meetings: state.meetings -1
      }
    case "UPDATE_HISTORICAL_FEELING":
      return {
        ...state,
        feeling: action.payload
      }
    case "UPDATE_HISTORICAL_MEETINGS":
      return {
        ...state,
        feeling: action.payload
      }
    case "UPDATE_HISTORICAL_MOODS":
      return {
        ...state,
        feeling: action.payload
      }
    case "UPDATE_HISTORICAL_SUGGESTIONS":
      return {
        ...state,
        feeling: action.payload
      }  
    case "ADDTO_HISTORICAL_MOODS":
      return {
        ...state,
        moods: [...state.moods, action.payload]
      }
    case "REMOVEFROM_HISTORICAL_MOODS":
    return {
      ...state,
      moods: state.moods.filter(elInList => elInList !== action.payload)
    }
    default:
      return state;
  }
}

export default calendarReducer;