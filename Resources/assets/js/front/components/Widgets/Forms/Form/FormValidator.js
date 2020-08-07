import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  validateForm,
} from './actions'

class FormValidator extends Component {

    constructor(props)
    {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState){
      return null;
    }

    componentDidUpdate(prevProps, prevState) {

      //console.log("FormValidator :: prevProps.validation ",this.props.validation);

      if(!prevProps.validation.validating && this.props.validation.validating) {
        
        console.log("FormValidator :: start validation!");

        this.props.validateForm(
          this.props.form.validationWS,
          this.props.parameters.formParameters,
          this.props.values
        );
      }
    }

    render() {
        return (
          <div></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        form : state.form,
        parameters : state.parameters,
        validation : state.validation
    }
}

const mapDispatchToProps = dispatch => {
    return {
      validateForm: (validationWS,formParameters,values) => {
        return dispatch(validateForm(validationWS,formParameters,values));
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormValidator);
