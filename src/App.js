import React, { Component} from 'react';
import {Label,Input,Button, Form, FormGroup, Col} from 'reactstrap';
import Result from './Result';

class App extends Component {
	constructor() {
		super();
		this.state = {
			origin:'',
			dest:'',
			showResult: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleResult = this.toggleResult.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		this.toggleResult();
	}

	toggleResult() {
		this.setState({showResult: !this.state.showResult});
	}

	render() {
		let showResult = this.state.showResult;

		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h3>Distance between zipcodes</h3>
					</div>
					<div className="col-12 col-md-9">
						<Form onSubmit={this.handleSubmit}>
							<FormGroup row>
								<Label htmlFor="origin" md={2}>Origin</Label>
								<Col md={10}>
									<Input type="text" id="origin" name="origin" value={this.state.origin}
									onChange={this.handleChange} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label htmlFor="dest" md={2}>Destination</Label>
								<Col md={10}>
									<Input type="text" id="dest" name="dest" value={this.state.dest}
									onChange={this.handleChange} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col md={{size: 10, offset: 2}}>
									<Button type="submit" color="primary" >Calculate</Button>
								</Col>
							</FormGroup>
						</Form>
					</div>
					{showResult &&
					<Result state={{...this.state}} ></Result>
					}
				</div>
			</div>

		);
	}
}

export default App;


