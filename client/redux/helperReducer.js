import { DateTime } from 'luxon'

const initialState = {
  now: DateTime.local().toUTC().ts,
  selectedDate: false,
  chartTimePeriod: 'week',
  dayRegistered: false,
  registerModal: false,
  routeName: '',
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
    case 'UPDATE_DAY':
      return {
        ...state,
        dayRegistered: action.payload
      }
    case 'REGISTER_MODAL':
      return {
        ...state,
        registerModal: action.payload
      }
    case 'UPDATE_ROUTE':
      return {
        ...state,
        routeName: action.payload
      }
    default:
      return state;
   }
}

export default helperReducer;