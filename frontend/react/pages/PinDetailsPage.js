import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import Image from 'react-image-fallback';

import {loadPinDetails} from '../actions/pinActions';

@connect((store) => {
	return {
		fetching: store.pinDetails.fetching,
		fetched : store.pinDetails.fetched,
		pin : store.pinDetails.pin,
	};
})
export default class PinDetailsPage extends React.Component{
	constructor(){
		super();

		this.deletePin = this.deletePin.bind(this);
	}

	componentWillMount(){
		this.props.dispatch(loadPinDetails(`/api/pin/${this.props.params.id}`));
	}

	render() {
		return(
			<div class="container">
			{this.props.fetched &&
				<div class='row text-center'>
					<div class="col-xs-offset-1 col-xs-10 col-sm-offset-4 col-sm-4">
						<Image class="center-block img-responsive"
							src={this.props.pin.image}
		                    fallbackImage='http://colorvisiontesting.com/images/plate%20with%205.jpg'
		                    initialImage='http://cdn.instructables.com/FMY/RT6K/GMX1S148/FMYRT6KGMX1S148.MEDIUM.gif'
		                />
		                <h2> {this.props.pin.description} </h2>

		                <hr/>

		                <div class='creator'>
		                	<small><i>Tech pinned by: </i></small> {this.props.pin.creator.name}
		                </div>

		                <button class='btn btn-danger' onClick={this.deletePin}> Delete Pin </button>
					</div>
				</div>
			}
			</div>
		)
	}

	deletePin(e){
		if(e) e.preventDefault();
		if (confirm('Are you sure you want to delete this TechPin ?')) {
			// delete quote
		    $.ajax({
				url: `/api/pin/${this.props.params.id}/delete/`,
				dataType: 'json',
			})
			.done((res) => {
				browserHistory.push('/');
			})
			.fail((res) => {
				console.log(res);
			});
		}
	}
}