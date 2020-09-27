import { DateTime } from 'luxon'

const initialState = {
  now: DateTime.local().toUTC().ts,
  selectedDate: false,
  chartTimePeriod: 'week',
}

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_DATE":
      return {
        ...state,
        selectedDate: action.payload
      }
    case 'UPDATE_TIMEPERIOD':
      return {
        ...state,
        chartTimePeriod: action.payload
      }
    default:
      return state;
   }
}

export default helperReducer;