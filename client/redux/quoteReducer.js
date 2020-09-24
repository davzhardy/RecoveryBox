const initialState = {
  todaysQuote: false,
}

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_QUOTE":
      return {
        ...state,
        todaysQuote: action.payload
      }
    default:
      return state;
  }
}

export default quoteReducer;