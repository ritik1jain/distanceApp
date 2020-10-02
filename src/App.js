import React, { Component } from 'react';
import {
  Label,
  Input,
  Button,
  Form,
  FormGroup,
  Col,
  Row,
  FormFeedback,
} from 'reactstrap';
import Result from './Result';

class App extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      dest: '',
      showResult: false,
      touched: {
        origin: false,
        dest: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleResult = this.toggleResult.bind(this);
    this.handleBlurr = this.handleBlurr.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleResult();
  }

  toggleResult() {
    this.setState({ showResult: true });
  }

  handleBlurr = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  validate(origin, dest) {
    const errors = {
      origin: '',
      dest: '',
    };
    if (this.state.touched.origin && origin.length !== 6)
      errors.origin = 'Provide valid 6 digit pincode';
    if (this.state.touched.dest && dest.length !== 6)
      errors.dest = 'Provide valid 6 digit pincode';

    return errors;
  }
  render() {
    let showResult = this.state.showResult;
    const errors = this.validate(this.state.origin, this.state.dest);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h3>Distance between zipcodes</h3>
          </div>
          <div className='col-12 col-md-9'>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor='origin' md={2}>
                  Origin
                </Label>
                <Col md={10}>
                  <Input
                    type='text'
                    id='origin'
                    name='origin'
                    value={this.state.origin}
                    valid={errors.origin === ''}
					invalid={errors.dest !== ''}
					onBlur={this.handleBlurr('origin')}
					onChange={this.handleChange}
					required={true}
                  />
				  <FormFeedback>{errors.origin}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor='dest' md={2}>
                  Destination
                </Label>
                <Col md={10}>
				<Input
                    type='text'
                    id='dest'
                    name='dest'
                    value={this.state.dest}
                    valid={errors.dest === ''}
					invalid={errors.dest !==''}
					onBlur={this.handleBlurr('dest')}
					onChange={this.handleChange}
					required={true}
                  />
				  <FormFeedback>{errors.dest}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type='submit' color='primary'>
                    Calculate
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
          {showResult && <Result state={{ ...this.state }}></Result>}
        </div>
      </div>
    );
  }
}

export default App;
