const initialState = {
  id: false,
  email: false,
  username: false,
  password: 'TODO: replace me',
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
    case "UPDATE_USERINFO":
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        registrationDate: action.payload.registrationDate,
      }
    default:
      return state;
  }
}

export default userReducer;