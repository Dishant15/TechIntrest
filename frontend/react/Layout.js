import React from 'react';

import Navbar from './components/Navbar'

export default class Layout extends React.Component {
	render(){
		return(
			<div id='main-content'>
				<Navbar />
				{this.props.children}
			</div>
		)
	}
}