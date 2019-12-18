import React, { Component } from 'react';
import {connect} from 'react-redux';

import axios from 'axios';
import moment from 'moment';

import {

} from './functions/';

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

      console.log("FormProceduresIterator :: componentDidUpdate (this.props.form.iterating) ",this.props.form.iterating);

      if(this.props.form.iterating) {

        /*
        const {procedures,currentProcedureIndex, stepsToProcess} = this.props.form;
        const procedure = procedures[currentProcedureIndex];

        //if the procedures no finished

        if(currentProcedureIndex < procedures.length )
        //if the methode is PUT set with a get
        if(!stepsToProcess
          && procedure.SERVICE !== undefined && procedure.SERVICE.METHODE == "PUT"){
          //set the jsonResult with a get
          return this.props.getJsonResultBeforePut(
            procedure,
            this.props.parameters.formParameters
          );
        }
        */

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
            this.props.form.jsonGetDone
          );

      }
      else if(!prevProps.form.complete && this.props.form.complete) {
        this.props.onFinish();
      }

      /*
      if(!prevProps.parameters.iterated && this.props.parameters.iterated){
        //if iteration finished

      }

      /*
      if(prevProps.someValue!==this.props.someValue){
        //Perform some operation here
        this.setState({someState: someValue});
        this.classMethod();
      }
      */
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
      processProcedure : (procedures,currentProcedureIndex, values,
          currentListIndex, stepsToProcess,jsonResult,formParameters,jsonGetDone) => {
        return dispatch(processProcedure(procedures,currentProcedureIndex, values,
            currentListIndex, stepsToProcess,jsonResult,formParameters,jsonGetDone))
      }
      /*
      iterateParameters: (formIterator,formParameters,variables) => {
          return dispatch(iterateParameters(formIterator,formParameters,variables));
      },
      */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProceduresIterator);
