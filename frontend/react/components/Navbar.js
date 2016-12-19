import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import {logoutUser} from '../actions/userAction';
import {addNotification} from '../actions/pinActions';

@connect((store) => {
	return {
		logged: store.loggeduser.logged,
		twitter_id : store.loggeduser.twitter_id,
		name : store.loggeduser.name,
	};
})
export default class Navbar extends React.Component {
	loggOut(e){
		e.preventDefault();
		this.props.dispatch(logoutUser());
		this.props.dispatch(addNotification(
							{
								type : 'warning',
								icon : 'fa-power-off',
								title : 'You have been Logged Out successfully',
							}
						));
		browserHistory.push('/');
	}

	render(){
		return(
			<div class="container" style={{margin:'30px auto'}}>

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
				        <li><Link to="/">Home</Link></li>
				      </ul>

				      
				      	{this.props.logged ? 
				      	<ul class="nav navbar-nav navbar-right">
				      		<li><Link to={`/user/${this.props.twitter_id}/pins/`}><small>Welcome, {this.props.name}</small></Link></li>
				      		<li><Link to='/pin/add/'>Add Pin</Link></li>
				      		<li><a href="#" onClick={(e)=>{this.loggOut(e)}}>Log Out</a></li>
				      	</ul>
				        :
				        <ul class="nav navbar-nav navbar-right">
					        <li><a href="/user/twitter/login/">Log In</a></li>
					    </ul>
				    	}
				      
				    </div>
				 
				</nav>
			</div>
		)
	}
}