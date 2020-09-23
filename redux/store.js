import { createStore } from "redux";

const initialState = {
  user: {
    username: false,
    firstName: 'David'
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload
        }
      }
    default:
      return state;
   }
}

const store = createStore(reducer);

export default store
