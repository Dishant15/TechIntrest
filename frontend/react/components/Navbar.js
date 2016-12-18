import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

@connect((store) => {
	return {
		logged: store.loggeduser.logged,
		twitter_id : store.loggeduser.twitter_id,
		name : store.loggeduser.name,
	};
})
export default class Navbar extends React.Component {
	render(){
		return(
			<div class="container">
				<Link to="/">Home</Link> | <Link to='/pin/add/'> Add Pin </Link> | <a href='/user/twitter/login/'> LogIn </a>

				<nav class="navbar navbar-default">
				  
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				      </button>
				      <Link class="navbar-brand" to="/">TechIntrest</Link>
				    </div>
				    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				      <ul class="nav navbar-nav">
				        <li><Link href="/">Home</Link></li>
				      </ul>

				      <ul class="nav navbar-nav navbar-right">
				      	{this.props.logged ? 
				      		<li class="dropdown">
					          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.name} <span class="caret"></span></a>
					          <ul class="dropdown-menu">
					            <li><a href="#">Action</a></li>
					            <li><a href="#">Another action</a></li>
					            <li><a href="#">Something else here</a></li>
					            <li role="separator" class="divider"></li>
					            <li><a href="#">Separated link</a></li>
					          </ul>
					        </li>
				        :
					        <li><a href="/user/twitter/login/">Log In</a></li>
				    	}
				      </ul>
				    </div>
				 
				</nav>
			</div>
		)
	}
}