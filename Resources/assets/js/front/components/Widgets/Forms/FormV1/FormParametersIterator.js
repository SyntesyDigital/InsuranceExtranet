import React, { Component } from 'react';
import {connect} from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import {

} from '../functions';

import {
  initParametersState,
  checkParameters,
  iterateParameters
} from './actions'

class FormParametersIterator extends Component {

    constructor(props)
    {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState){

      return null;

    }

    componentDidUpdate(prevProps, prevState) {

      //console.log("FormParametersIterator :: componentDidUpdate",this.props.parameters);

      if(this.props.parameters.iterating) {
        //console.log("FormParametersIterator :: start interate");

        //if there is something to iterate
          //iterate
        this.props.iterateParameters(
          this.props.parameters.formIterator,
          this.props.parameters.formParameters,
          this.props.form.variables
        );

      }

      if(!prevProps.parameters.iterated && this.props.parameters.iterated){
        //if iteration finished

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
        parameters : state.parameters
    }
}

const mapDispatchToProps = dispatch => {
    return {
      iterateParameters: (formIterator,formParameters,variables) => {
          return dispatch(iterateParameters(formIterator,formParameters,variables));
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormParametersIterator);
