import $ from 'jquery';

export function getLoggedUser(){
	// paginated res
	return ( (dispatch) => {
		dispatch({type:"USER_STATUS_FETCHING"});
		$.ajax({
			url : '/user/status/',
			dataType: 'json',
		})
		.done((res) => {
			dispatch({
				type:"USER_STATUS_FETCHED",
				payload: res
			});
		})
		.fail((err) => {
			console.log(err)
		});
	})
}

export function logoutUser(){
	// paginated res
	return ( (dispatch) => {
		dispatch({type:"USER_LOGOUT"});
		$.ajax({
			url : '/user/logout/',
			dataType: 'json',
		})
	})
}