const initState = {
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

		default: {
			return { ...state }
		}
	}
}

export default loggedUserReducer;