import React from 'react';
import { connect } from 'react-redux';

import store from '../store';

@connect((store) => {
	return {
		notifications : store.notifications.notifications,
		count : store.notifications.noti_count,
	};
})
export default class NotificationList extends React.Component {

	renderNotification(){
		if(this.props.count > 0){
			return(
				this.props.notifications.map((notification, index) => {
					
					return (
						<NotificationDetail key={index}
							type={notification.type}
							icon={notification.icon}
							title={notification.title}
							text={notification.text}
							timeout={notification.timeout}
						/>
					)
				})
			)
		}
	}

	render(){
		return(
			<div class="notification">
				{this.renderNotification()}
			</div>
		)
	}
}


class NotificationDetail extends React.Component {

	constructor(props){
		super(props);

		const timeout = props.timeout ? props.timeout : 5000;
		this.state = {
			timeout,
		}

		this.removeNotification = this.removeNotification.bind(this);
	}

	componentDidMount(){
		// remove notification automatically after 5 secs (default)
		const _this = this;
		this.timerFunc = setTimeout(() => {
			// console.log(_(this.props)
			_this.removeNotification();
		}, this.state.timeout);
	}

	/*
	If Timeout is cleared than it causes problems for multiple noti.
	First removed noti clears the last created noti's timeout so the
	last one is never removed automatically
	*/
	// componentWillUnmount(){
	// 	clearTimeout(this.timerFunc);
	// }

	removeNotification(){
		store.dispatch({
			type: 'REMOVE_NOTIFICATION',
			payload: this.props.title,
		})
	}

	render(){
		return(
			<div class={`content ${this.props.type}`}>
				<div class="icon">
					<i class={`fa fa-2x ${this.props.icon}`}></i>
				</div>

				<div class="text">
					<div class="title"><b>{this.props.title}</b></div>
					{this.props.text && <div>{this.props.text}</div>}
				</div>

				<div class="cancel" onClick={this.removeNotification}><i class="fa fa-times"></i></div>
			</div>
		)
	}
}

NotificationDetail.propTypes = {
	// type of notification "success(info) | warning | error"
	type : React.PropTypes.string.isRequired,
	// fa icon to show on notification
	icon : React.PropTypes.string.isRequired,

	title : React.PropTypes.string.isRequired,
	text : React.PropTypes.string,
	timeout : React.PropTypes.number,
};