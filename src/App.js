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

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
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
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'origin':
        errors.origin =
          value.length !== 6 ? 'Provide valid 6 digit pincode' : '';
        break;
      case 'dest':
        errors.dest = value.length !== 6 ? 'Provide valid 6 digit pincode' : '';
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
      errors,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info('Valid Form');
      this.toggleResult();
    } else {
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
            <h3>DISTANCE BETWEEN ZIPCODES</h3>
          </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <Form onSubmit={this.handleSubmit} className="row">
                <Col className="col-md-6">
                  <FormGroup row>
                    <Col md={2}>
                      <Label htmlFor='origin'>
                        Origin
                      </Label>
                    </Col>
                    <Col md={6}>
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
                </Col>
                <Col className="col-md-6">
                  <FormGroup row>
                    <Col  md={2}><Label htmlFor='dest'>
                      Destination
                    </Label>
                    </Col>
                    <Col md={6}>
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
                </Col>
                <Col className="offset-md-10">
                  <FormGroup row>
                    <Col>
                      <Button size="lg" type='submit' color='primary'>
                        Calculate
                      </Button>
                    </Col>
                  </FormGroup>
                </Col>
              </Form>
            </div>
          </div>
          {showResult && (
            <Result
              state={{ ...this.state }}
              toggle={this.toggleResult}
            ></Result>
          )}
        </div>
    );
  }
}

export default App;
