import React from 'react';

import Navbar from './components/Navbar'
import Notification from './components/Notification'

export default class Layout extends React.Component {
	render(){
		return(
			<div id='main-content'>
				<Navbar />
				<Notification />
				{this.props.children}
			</div>
		)
	}
}