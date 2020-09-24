const initialState = {
  username: false,
  password: false,
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