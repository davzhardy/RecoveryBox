const initialState = {
  id: false,
  email: false,
  firstName: false,
  lastName: false,

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
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      }
    default:
      return state;
  }
}

export default userReducer;