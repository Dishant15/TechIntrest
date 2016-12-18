import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import loggedUserReducer from "./reducers/userappReducer";
import {pinDetailsReducer, pinListReducer} from "./reducers/pinReducer";
import {getLoggedUser} from './actions/userAction';

const reducers = combineReducers({
	loggeduser 			: loggedUserReducer,
	pinDetails			: pinDetailsReducer,
	pinList 			: pinListReducer,
});

const store = createStore( reducers, applyMiddleware(thunk));

store.subscribe(()=>{
	console.log("Store Updated :", store.getState().loggeduser);
});

store.dispatch(getLoggedUser());

export default store;