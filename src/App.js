import React, { Component } from 'react';
import {
  Label,
  Input,
  Button,
  Form,
  FormGroup,
  Col, 
  FormFeedback,
} from 'reactstrap';
import Result from './Result';

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length>0 && (valid = false));
  return valid;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      dest: '',
      showResult: false,
      errors: {
        origin: '',
        dest: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleResult = this.toggleResult.bind(this);
    
  }

  handleChange(e) {
    e.preventDefault();
    const {name, value} = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'origin':
        errors.origin = value.length !== 6 ? 'Provide valid 6 digit pincode' : '';
        break;
      case 'dest':
        errors.dest = value.length !== 6 ? 'Provide valid 6 digit pincode' : '';
        break;
      default: break;
    }
    this.setState({
      [name]: value,
      errors
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
      this.toggleResult();
    }else {
      console.error('Invalid form');
    }
    
  }

  toggleResult() {
    this.setState({ showResult: !this.state.showResult });
  }

  
  render() {
    let showResult = this.state.showResult;
     const errors = this.state.errors;
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
                    invalid={errors.origin !== ''}
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
                    invalid={errors.dest !== ''}
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
