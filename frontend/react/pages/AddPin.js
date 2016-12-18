import React from 'react';
import {submitFormData} from '../utils';
import Image from 'react-image-fallback';

export default class Addpin extends React.Component {
	constructor(){
		super();

		this.state = {
			description: "",
			image_url: "",
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		if(e) e.preventDefault();

		const data = {
			...this.state,
		}

		const url = "/api/pin/add/"
		const test = (res)=>{console.log(res)}
		submitFormData(url, data, test, test)
	}

	handleTextChange(event){
		let newState = {};
		newState[event.target.name] = event.target.value
		this.setState(newState);
	}

	render(){
		return(
			<div class='container'>
				<form id="add-pin" class="row">
					<div class="col-xs-offset-1 col-xs-10 col-sm-4">
						{this.state.image_url &&
							<Image class="block-center img-responsive" key={this.state.image_url}
								src={this.state.image_url}
			                    fallbackImage='http://colorvisiontesting.com/images/plate%20with%205.jpg'
			                    initialImage='http://cdn.instructables.com/FMY/RT6K/GMX1S148/FMYRT6KGMX1S148.MEDIUM.gif'
			                />
						}

						{!this.state.image_url && 
							<div class='text-center image-div'>
								<h3>Copy paste a tech image url bellow</h3>
							</div>
						}

						<div class = "form-group">
					        <input type="text" class="form-control" 
					        	name="image_url"
					        	placeholder='paste a Tech image url here...'
					        	onChange={this.handleTextChange} 
					        	value={this.state.image_url} 
					        />
						</div>
					</div>

					<div class="col-xs-offset-1 col-xs-10 col-sm-offset-0 col-sm-6">
						<div class = "form-group">
							<label>Tech Description</label>
					        <textarea type="text" rows="3" class="form-control" 
					        	name="description"
					        	placeholder="Main Quote Line"
					        	onChange={this.handleTextChange} 
					        	value={this.state.description} 
					        />
						</div>
					</div>
				</form>
				<div class='row text-center'>
					<button class='btn btn-default' onClick={this.submitForm}> Add Pin </button>
				</div>
			</div>
		)
	}
}