import $ from 'jquery';


export function loadPinDetails(url){
	// paginated res
	return ( (dispatch) => {
		dispatch({type:"LOAD_PIN_DETAILS"});
		$.ajax({
			url : url,
			dataType: 'json',
		})
		.done((res) => {
			dispatch({
				type:"PIN_DETAILS_LOADED",
				payload: res
			});
		})
		.fail(() => {
			dispatch({type:"PIN_DETAILS_LOAD_FAIL"});
		});
	})
}

export function loadPinList(url){
	// paginated res
	return ( (dispatch) => {
		dispatch({type:"LOAD_PINS"});
		$.ajax({
			url : url,
			dataType: 'json',
		})
		.done((res) => {
			dispatch({
				type:"PINS_LOADED",
				payload: res
			});
		})
		.fail(() => {
			dispatch({type:"PINS_LOAD_FAIL"});
		});
	})
}

export function addNotification(notification){
	if(_.isArray(notification)){
		return {
			type:'ADD_NOTIFICATION',
			payload: notification,
		}
	} else {
		return {
			type:'ADD_NOTIFICATION',
			payload: [ notification ],
		}
	}
}