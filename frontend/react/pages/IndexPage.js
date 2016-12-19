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
export default class IndexPage extends React.Component {

	componentWillMount(){
		this.props.dispatch(loadPinList('/api/pin/all/'))
	}

	render(){
		return(
			<div style={{textAlign:'center'}}>
				<div class="container" >
					<h2 class="heading">Best Tech Pins, All at one place</h2>
					{this.props.fetched &&
						<BlockGrid data={this.props.pins} />
					}
					{this.props.fetching &&
						<h1 class='text-center'>Loading...</h1>
					}
				</div>
			</div>
		)
	}
}