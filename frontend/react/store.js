import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import loggedUserReducer from "./reducers/userappReducer";


const reducers = combineReducers({
	loggeduser 			: loggedUserReducer,
});

const store = createStore( reducers, applyMiddleware(thunk));

// store.subscribe(()=>{
// 	console.log("Store Updated :", store.getState().loggeduser.user_entries);
// });

export default store;