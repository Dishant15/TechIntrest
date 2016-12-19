import _ from 'lodash';
import store from '../store';

const initState = {
	pin: {
		image: 'www.loading.com',
		description: "Please wait while we load your data",
		creator: {
			name: "--",
			twitter_id: null
		}
	},
	fetched: false,
	fetching: false,
}

export const pinDetailsReducer = (state=initState, action) => {
	switch(action.type){
		case "LOAD_PIN_DETAILS": {
			return {...state, fetching:true, fetched: false}
		}

		case "PIN_DETAILS_LOADED": {
			return {...state, fetching:false, fetched: true, pin: action.payload}
		}

		case "PIN_DETAILS_LOAD_FAIL": {
			return {
				...state, 
				fetching:false, 
				fetched: true, 
				pin:{ image:'broken', description:'something went wrong!', creator: {name:'--', twitter_id: null} } 
			}
		}

		default: {
			return state;
		}
	}
}

const pinListState= {
	fetched: false,
	fetching: false,
	pins: [],
}

export const pinListReducer = (state=pinListState, action) => {
	switch(action.type){
		case "LOAD_PINS": {
			return {...state, fetching:true, fetched: false}
		}

		case "PINS_LOADED": {
			return {...state, fetching:false, fetched: true, pins: action.payload}
		}

		case "PINS_LOAD_FAIL": {
			return {...pinListState, error:true}
		}

		default: {
			return state;
		}
	}
}

const initNotiState = {
	noti_count : 0,
	notifications : [],
}

export const notificationReducer = (state=initNotiState, action) => {

	switch(action.type){
		case "ADD_NOTIFICATION": {
			const new_notifications = _.unionBy(state.notifications, action.payload, 'title');
			return {...state, notifications: new_notifications, noti_count : new_notifications.length }
		}

		case "REMOVE_NOTIFICATION": {
			const new_notifications = _.pullAllBy(state.notifications, [{'title': action.payload}], 'title');
			return {...state, notifications: new_notifications, noti_count : new_notifications.length }
		}

		case "USER_STATUS_FETCHED": {
			if(!store.getState().loggeduser.logged && action.payload.logged ) {
				const noti = {
								type : 'success',
								icon : 'fa-power-off',
								title : `Welcome to TechIntrest, ${action.payload.name}`,
							}
				const new_notifications = _.unionBy(state.notifications, [noti], 'title');
				return {...state, notifications: new_notifications, noti_count : new_notifications.length }
			} else {
				return {...state};
			}
		}

		default: {
			return {...state};
		}
	}

}