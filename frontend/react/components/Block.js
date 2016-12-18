import React from 'react';
import Image from 'react-image-fallback';

export default class Block extends React.Component{
	render(){
		return(
			<div class="block" style={{background:'white'}}>
				<div class='block-img'>
					<Image class="block-center img-responsive"
						src={this.props.image}
	                    fallbackImage='http://colorvisiontesting.com/images/plate%20with%205.jpg'
	                    initialImage='http://cdn.instructables.com/FMY/RT6K/GMX1S148/FMYRT6KGMX1S148.MEDIUM.gif'
	                    alt={this.props.description}
			            onLoad={this.props.loadHandler}
	                />
				</div>
				<div class='block-description'>
					{this.props.description}
				</div>
				<hr/>
				<div class='block-creator'>
					{this.props.creator.name}
				</div>
			</div>
		)
	}
}