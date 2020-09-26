const initialState = {}

const historicalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_HISTORICALDATA_WITH_DAILYINFO":
      return {...state, key: action.payload}
    case "CREATE_HISTORICALDATA":
      return {...state, ...action.payload}
    default:
      return state;
  }
}

export default historicalDataReducer;