import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

import Block from './Block';

export default class BlockGrid extends React.Component {

	constructor() {
		super();
		this.setDefaults();

		this.setContainerWidth = this.setContainerWidth.bind(this);
		this.handleWindowResize = this.handleWindowResize.bind(this);
		this.resizeTimer = null;

		// throttle call to this func whenever an image is loaded
		this.throttledSetContainerWidth = _.throttle(this.setContainerWidth, 500);
	}

	setDefaults(){
		this.blockWidth = 260;	// initial desired block width
		this.borderWidth = 5;
		this.wrapperWidth = 0;
		this.colCount = 0;
		this.blocks = [];
		this.blockCount = 0;
	}

	handleWindowResize(){
		clearTimeout(this.resizeTimer);
		const _this = this;

	    this.resizeTimer = setTimeout(function() {
	    	$('.block-container').css('width', '100%');
	    	_this.setDefaults();
	    	_this.setContainerWidth();
	    	// above code computes false height of blocks
	    	// so as a lose patch re-position blocks after 500 ms
	    	setTimeout(_this.setContainerWidth, 700);
	    }, 200);
	}

	componentDidMount(){
		this.setContainerWidth();
		/*
			height of each block is measured with an error the first time so there are some
			space between blocks specially the top values of the grid.
			Only solution seems like re calculating positions of the block after few seconds
		*/
		// _.delay(this.setContainerWidth, 3000);
		// reset all blocks when window resized
		$(window).resize(this.handleWindowResize);
	}

	componentWillReceiveProps(nextProps){
		// after clicking Load More there will be newProps here
		// Re calculate block positions so no error occurs when there are 
		// all image less blocks
		// _.delay(this.setContainerWidth, 2000);
	}

	componentDidUpdate(prevProps, prevState){
		if(this.blockCount != this.props.data.length){
			this.setDefaults();
			this.setContainerWidth();
		}
	}

	componentWillUnmount(){
		$(window).off("resize", this.handleWindowResize);
	}

	setContainerWidth(){
		// setContainerWidth only first time we recieve BlockList data
		if(this.wrapperWidth == 0){
			this.wrapperWidth = $('.block-container').outerWidth();

			this.colCount = Math.round(this.wrapperWidth/this.blockWidth);
			$('.block').css('width', this.blockWidth);

			this.blockCount = document.getElementsByClassName('block').length;
			if(this.blockCount < this.colCount){
				this.wrapperWidth = (this.blockWidth*this.blockCount) - ( (this.blockCount - 1) * this.borderWidth);
				this.colCount = this.blockCount;
				
			} else {
				this.wrapperWidth = (this.blockWidth*this.colCount) - ( (this.colCount - 1) * this.borderWidth);
			}
			
			$('.block-container').css('width', this.wrapperWidth);
		}
		// if wrapperWidth is already calculated than just reset block positions
		for( var i = 0; i < this.colCount; i++ )
			this.blocks[i] = 0;

		this.setBlocks();
	}

	setBlocks() {
		const component = this;
		$('.block').each(function(){

			var min = Math.min.apply(Math, component.blocks);
			var index = $.inArray(min, component.blocks);
			var left = index * (component.blockWidth - component.borderWidth) - component.borderWidth;
			// for the first blocks that needs to overlap container border
			if(left == 0)
				left = - component.borderWidth;
			// start with overlap on top container border
			var top = min + 10 - component.borderWidth;
			
			$(this).css({
				'top' : top + 'px',
				'left' : left + 'px'
			});
			component.blocks[index] = top + this.offsetHeight;
		});

		// set wrapper height
		var wrapperHeight = Math.max.apply(Math, this.blocks);
		wrapperHeight += this.borderWidth;    // block borders

		$(".block-container").css("height",wrapperHeight + 'px');
	}
		
	renderBlocks() {
		const { data } = this.props;

		return data.map((pin) => {
			return <Block {...pin} key={pin._id} loadHandler={this.throttledSetContainerWidth}/>;
		});
	}

	render() {

		return(
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10">
					<div class="block-container">

						{ this.renderBlocks() }

					</div>
				</div>
			</div>
		);
	}
}

