import React, { Component } from 'react';
import {connect} from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import {

} from '../functions';

import {
  getJsonResultBeforePut,
  processProcedure,
  finish
} from './actions'

class FormProceduresIterator extends Component {

    constructor(props)
    {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState){
      return null;
    }

    componentDidUpdate(prevProps, prevState) {

      //console.log("FormProceduresIterator :: componentDidUpdate (this.props.form.iterating) ",this.props.form.iterating);

      if(this.props.form.iterating) {

        console.log("FormProceduresIterator :: start interate (props.form) ",this.props.form);

        //if there is something to iterate
          //iterate

        this.props.processProcedure(
            this.props.form.procedures,
            this.props.form.currentProcedureIndex,
            this.props.values,
            this.props.form.currentListIndex,
            this.props.form.stepsToProcess,
            this.props.form.jsonResult,
            this.props.parameters.formParameters,
            this.props.form.jsonGetDone,
            this.props.version
          );

      }
      else if(!prevProps.form.complete && this.props.form.complete) {
        this.props.onFinish();
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
      getJsonResultBeforePut : (procedure,formParameters) => {
        return dispatch(getJsonResultBeforePut(procedure,formParameters));
      },
      processProcedure : (procedures,currentProcedureIndex, values, currentListIndex, stepsToProcess,jsonResult,formParameters,jsonGetDone, version) => {
        return dispatch(processProcedure(procedures,currentProcedureIndex, values, currentListIndex, stepsToProcess,jsonResult,formParameters,jsonGetDone,version))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProceduresIterator);
