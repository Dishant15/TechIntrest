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

	render(){
		return(
			<div class='text-center'>
				{this.renderTitle()}
				<div class="container" >
					{this.props.fetched &&
						<BlockGrid data={this.props.pins} />
					}
				</div>
			</div>
		)
	}

	renderTitle(){
		if(this.props.fetched){
			const creator = this.props.pins[0].creator;

			return(
				<h2>Tech Pins by {creator.name}</h2>
			)
		}
	}
}