import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

export default class IndexPage extends React.Component {

	render(){
		return(
			<div style={{textAlign:'center'}}>
				<h2>This is from react world. And it is amazing!</h2>

				<button><a href="/user/twitter/login/"> Twitter Login </a></button>
				<Link to='/pin/add/'> Add Pin </Link>
			</div>
		)
	}
}