import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {loadPinList} from '../actions/pinActions';
import BlockGrid from '../components/BlockGrid';

@connect((store) => {
	return {
		fetching: store.pinList.fetching,
		fetched : store.pinList.fetched,
		pins : store.pinList.pins,
	};
})
export default class UserPinsPage extends React.Component {

	componentWillMount(){
		this.props.dispatch(loadPinList(`/api/user/${this.props.params.id}/`))
	}

	componentWillReceiveProps(nextProps){
		if(this.props.params.id != nextProps.params.id){
			this.props.dispatch(loadPinList(`/api/user/${nextProps.params.id}/`))
		}
	}

	render(){
		return(
			<div class='text-center'>
				{this.renderTitle()}
				<div class="container" >
					{this.renderPins()}

					{this.props.fetching &&
						<h1 class='text-center'> Loading ... </h1>
					}
				</div>
			</div>
		)
	}

	renderPins(){
		if(this.props.fetched ){
			if(this.props.pins.length > 0){
				return <BlockGrid data={this.props.pins} />
			} else {
				return <h2 class='text-center'>Oops, No Tech here yet!!</h2>
			}
		}
	}

	renderTitle(){
		if(this.props.fetched){
			const creator = this.props.pins[0].creator;

			return(
				<h2 class="heading">Tech Pins by {creator.name}</h2>
			)
		}
	}
}