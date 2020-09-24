const initialState = {
  username: 'replace me in the userreducer when dev is over',
  password: 'replace me in the userreducer when dev is over',
  firstName: 'David',
  lastName: 'Hardy',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return {
        ...state,
        username: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;