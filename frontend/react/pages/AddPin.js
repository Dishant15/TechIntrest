import React from 'react';
import {browserHistory} from 'react-router';
import {submitFormData, ErrorList} from '../utils';
import Image from 'react-image-fallback';

export default class Addpin extends React.Component {
	constructor(){
		super();

		this.state = {
			description: "",
			image: "",
			error: {},
		}

		this.handleTextChange = this.handleTextChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		if(e) e.preventDefault();
		const data = {
			...this.state,
			error: undefined,
		}

		if(data.description.length == 0){
			this.setState({error:{
				description:['Please provide a description for this TechPin']
			}})
			return;
		} else if(data.image.length == 0){
			this.setState({error:{
				image:['Please provide a Tech image url for this TechPin']
			}})
			return;
		} else {
			// rest of validation checks here
		
		}

		const url = "/api/pin/add/"
		const callback = (res)=>{
			if(res.success){
				browserHistory.push(`/pin/${res.data._id}/`);
			} else {
				console.log(res);
			}
		}
		const errback = (res) => {console.log(res)}
		submitFormData(url, data, callback, errback)
	}

	handleTextChange(event){
		let newState = {};
		newState[event.target.name] = event.target.value
		this.setState({...newState, error:{}});
	}

	renderErrorBlock(field_name){
		const err_list = this.state.error[field_name];
		if(err_list){
			return (
				err_list.map( (err, id) => { return <ErrorList key={id} error={err} /> })
			)
		}
	}

	render(){
		return(
			<div class='container'>
				<form id="add-pin" >
					<div class='row'>
						<div class="col-xs-offset-1 col-xs-10 col-sm-offset-4 col-sm-4">
							{this.state.image &&
								<Image class="block-center img-responsive" key={this.state.image}
									src={this.state.image}
				                    fallbackImage='/media/broken.jpg'
				                    initialImage='/media/loading.gif'
				                />
							}

							{!this.state.image && 
								<div class='text-center image-div'>
									<h3>Copy paste tech image url bellow</h3>
								</div>
							}

							<div class = "form-group">
								{this.renderErrorBlock('image')}
						        <input type="text" class="form-control" 
						        	name="image"
						        	placeholder='paste a Tech image url here...'
						        	onChange={this.handleTextChange} 
						        	value={this.state.image} 
						        />
							</div>
							<div class = "form-group">
								<label>Tech Description</label>
								{this.renderErrorBlock('description')}
						        <textarea type="text" rows="3" class="form-control" 
						        	name="description"
						        	placeholder="Tell us more about this tech!"
						        	onChange={this.handleTextChange} 
						        	value={this.state.description} 
						        />
							</div>
						</div>
					</div>

					<div class='text-center'>
						<button class='btn btn-default' onClick={this.submitForm} style={{minWidth:'150px'}}> Add Pin </button>
					</div>
				</form>
				
			</div>
		)
	}
}