import { DateTime } from 'luxon'

const initialState = {
  now: DateTime.local().toUTC().ts,
  selectedDate: false,
}

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_DATE":
      return {
        ...state,
        selectedDate: action.payload
      }
    default:
      return state;
   }
}

export default helperReducer;