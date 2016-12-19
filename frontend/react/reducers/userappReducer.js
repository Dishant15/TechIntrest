const initState = {
	fetching: false,
	fetching: false,
	logged: false,
	twitter_id: null,
	name: "",
};

const loggedUserReducer = (state=initState, action) => {
	switch(action.type){
		case "USER_STATUS_FETCHING": {
			return { ...state, fetching:true, fetched: false }
		}

		case "USER_STATUS_FETCHED": {
			return { ...state, fetching:false, fetched: true, ...action.payload }
		}

		case "USER_LOGOUT": {
			return { ...initState }
		}

		default: {
			return { ...state }
		}
	}
}

export default loggedUserReducer;