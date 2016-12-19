import React from 'react';
import Image from 'react-image-fallback';
import {Link} from 'react-router';

export default class Block extends React.Component{

	render(){
		return(
			<div class="block" style={{background:'white'}}>
				<Link to={`/pin/${this.props._id}/`}>
					<div class='block-img'>
						<Image class="center-block img-responsive"
							src={this.props.image}
		                    fallbackImage='/media/broken.jpg'
			                initialImage='/media/loading.gif'
		                    alt={this.props.description}
				            onLoad={this.props.loadHandler}
		                />
					</div>
					<div class='block-description'>
						{this.props.description}
					</div>
				</Link>
				<Link to={`/user/${this.props.creator.twitter_id}/pins/`}>
					<blockquote class="blockquote-reverse block-creator">
						<footer>
							<cite title="Source Title">{this.props.creator.name}</cite>
						</footer>
					</blockquote>
				</Link>
			</div>
		)
	}
}