const initialState = {
  meetings: 2,
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
    default:
      return state;
   }
}

export default dailyInfoReducer;