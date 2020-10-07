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
import './App.css';

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
      <div className='container App'>
        <div className='row'>
          <div className='col-12'>
            <h3 id="head" className='text-center heading text-uppercase header'>
              Distance between zipcodes
            </h3>
          </div>
          <div className='col-12'>
            <Form onSubmit={this.handleSubmit}>
              <div className='row justify-content-between'>
                <div className='col-6'>
                  <FormGroup className="row">
                    <Label htmlFor='origin' className="text-center label col-3 col-sm-3">
                      Origin:
                    </Label>
                    <Col className="col-8 col-sm-8">
                      <Input className="inp"
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
                </div>
                <div className='col-6'>
                  <FormGroup className="row">
                    <Label htmlFor='dest'  className="text-center label col-3">
                      Destination:
                    </Label>
                    <Col className="col-8 ">
                      <Input className="inp"
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
                </div>
                </div>
                <div className="row justify-content-end">
                <div className='col-6'>
                  <FormGroup className="row justify-content-end">
                    <Col className="col-5 pd">
                      <Button type='submit' size="sm" block className="btnn">
                        Calculate
                      </Button>
                    </Col>
                  </FormGroup>
                </div>
                </div>
                
            </Form>
          </div>
        </div>
        <div className="col-12">{showResult && <Result state={{ ...this.state }} toggle={this.toggleResult}></Result>}
     </div>
         </div>
    );
  }
}

export default App;
