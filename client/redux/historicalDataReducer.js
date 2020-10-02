const initialState = {

  1600300800000: {
    date: 1600300800000,
    meetings: 2,
    feeling: 5,
    moods: ['tired', 'happy', 'bored'],
    suggestions: ['Meetings', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself', 'Gratitude', 'Step 10s', 'Inventory', 'Called a Newcomer'],
  },
  1600387200000: {
    date: 1600387200000,
    meetings: 1,
    feeling: 4,
    moods: ['tired', 'happy', 'down'],
    suggestions: ['Gratitude', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  },
  1600473600000: {
    date: 1600473600000,
    meetings: 0,
    feeling: 3,
    moods: ['elated', 'happy', 'sad'],
    suggestions: ['Inventory', 'Called a Newcomer', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  },
  1600560000000: {
    date: 1600560000000,
    meetings: 2,
    feeling: 2,
    moods: ['joyful', 'happy', 'sad'],
    suggestions: ['Kind to Myself']
  },
  1600646400000: {
    date: 1600646400000,
    meetings: 5,
    feeling: 5,
    moods: ['bored', 'happy', 'sad'],
    suggestions: ['Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  },
  1600819200000: {
    date: 1600819200000,
    meetings: 2,
    feeling: 10,
    moods: [],
    suggestions: []
  },
  1600905600000: {
    date: 1600905600000,
    meetings: 0,
    feeling: 9,
    moods: ['stressed', 'happy', 'sad'],
    suggestions: ['Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  },
  1601078400000: {
    date: 1601078400000,
    meetings: 5,
    feeling: 7,
    moods: ['tired', 'happy', 'sad'],
    suggestions: ['Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  }
}

// TODO refactor this to some kind of array so the data is more easily accessible

const historicalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_HISTORICALDATA_WITH_DAILYINFO":
      return {...state, key: action.payload}
    case "UPDATE_HISTORICALDATA_WITH_HISTORICALINFO":
      return {...state, newkey: action.payload}
    case "CREATE_HISTORICALDATA":
      return {...state, ...action.payload}
    default:
      return state;
  }
}

export default historicalDataReducer;


// TODO delete this historical data when im 100% sure I dont need it 
 // 1600300800000: {
  //   date: 1600300800000,
  //   meetings: 2,
  //   feeling: 5,
  //   moods: ['tired', 'happy', 'bored'],
  //   suggestions: ['Meetings', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself', 'Gratitude', 'Step 10s', 'Inventory', 'Called a Newcomer'],
  // },
  // 1600387200000: {
  //   date: 1600387200000,
  //   meetings: 1,
  //   feeling: 4,
  //   moods: ['tired', 'happy', 'down'],
  //   suggestions: ['Gratitude', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  // },
  // 1600473600000: {
  //   date: 1600473600000,
  //   meetings: 0,
  //   feeling: 3,
  //   moods: ['elated', 'happy', 'sad'],
  //   suggestions: ['Inventory', 'Called a Newcomer', 'Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  // },
  // 1600560000000: {
  //   date: 1600560000000,
  //   meetings: 2,
  //   feeling: 2,
  //   moods: ['joyful', 'happy', 'sad'],
  //   suggestions: ['Kind to Myself']
  // },
  // 1600646400000: {
  //   date: 1600646400000,
  //   meetings: 5,
  //   feeling: 5,
  //   moods: ['bored', 'happy', 'sad'],
  //   suggestions: ['Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  // },
  // 1600819200000: {
  //   date: 1600819200000,
  //   meetings: 2,
  //   feeling: 10,
  //   moods: [],
  //   suggestions: []
  // },
  // 1600905600000: {
  //   date: 1600905600000,
  //   meetings: 0,
  //   feeling: 9,
  //   moods: ['stressed', 'happy', 'sad'],
  //   suggestions: ['Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  // },
  // 1601078400000: {
  //   date: 1601078400000,
  //   meetings: 5,
  //   feeling: 7,
  //   moods: ['tired', 'happy', 'sad'],
  //   suggestions: ['Prayer', 'Meditation', 'Useful', 'Kind to Myself']
  // },