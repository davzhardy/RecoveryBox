const initialState = {
	jwt: '' ,
}

const jwtReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_JWT': 
		return {
			...state,
			jwt: action.payload
		}
		case 'DELETE_JWT': 
		return {
			...state,
			jwt: '',
		}
		default:
      return state;
	}
}

export default jwtReducer;