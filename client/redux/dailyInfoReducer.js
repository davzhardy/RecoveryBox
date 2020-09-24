const initialState = {
  meetings: 2,
  feeling: 50,
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
    default:
      return state;
   }
}

export default dailyInfoReducer;