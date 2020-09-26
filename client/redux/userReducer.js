const initialState = {
  id: 1,
  email: false,
  username: 'cow',
  password: 'replace me in the userreducer when dev is over',
  firstName: false,
  lastName: false,
  registrationDate: false,
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