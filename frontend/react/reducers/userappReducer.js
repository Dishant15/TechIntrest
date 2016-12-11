const initState = {};

const loggedUserReducer = (state=initState, action) => {
	switch(action.type){
		case "USER_STATUS_FETCHING": {
			return { ...state, fetching:true, fetched: false }
		}

		default: {
			return { ...state }
		}
	}
}

export default loggedUserReducer;