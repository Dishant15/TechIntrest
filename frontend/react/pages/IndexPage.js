import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import BlockGrid from '../components/BlockGrid';

export default class IndexPage extends React.Component {
	constructor(){
		super();

		this.state = {
			loading: true,
			pins : [],
		}
	}

	componentWillMount(){
		const _this = this;
		 $.ajax({
	        url: '/api/pin/all/' ,
	        dataType: 'json',
	        success: (res) => {
	            _this.setState({
	            	loading:false,
	            	pins: res.pins
	            })
	        },
	        error: (err) => {
	            console.log(err);
	        }
	    });
	}

	render(){
		return(
			<div style={{textAlign:'center'}}>
				<h2>This is from react world. And it is amazing!</h2>
				<div class="container" >
					{!this.state.loading &&
						<BlockGrid data={this.state.pins} />
					}
				</div>
			</div>
		)
	}
}