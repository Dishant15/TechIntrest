import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
	render(){
		return(
			<div class="container text-center" style={{margin:'40px auto'}}>
				<Link to="/">Home</Link> | <Link to='/pin/add/'> Add Pin </Link> | <a href='/user/twitter/login/'> LogIn </a>
			</div>
		)
	}
}